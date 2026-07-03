import express from "express"
import { getShorteners } from "./handler.js";
import { ErrorResponse } from "../../shared/Errors/ErrorResponse.js";
import { ShortenerDto } from "./dto.js";
import createError from 'http-errors';
import { DeleteRedis, GetRedis, SetRedis } from "../../shared/lib/redis-connection.js";
import { AnaliticUrl } from "../../shared/utils/analiticUrl.js";

const SHORT_URL_LENGTH = 5
const SHORT_URL_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const generateCandidate = () =>
  Array.from({ length: SHORT_URL_LENGTH }, () =>
    SHORT_URL_CHARS.charAt(Math.floor(Math.random() * SHORT_URL_CHARS.length))
  ).join('')

const generateShortUrl = async () => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const candidate = generateCandidate()
    const existing = await ShortenerDto.getOriginUrl(candidate)
    if (existing.rowCount === 0) {
      return candidate
    }
  }
  throw new ErrorResponse(500, 'Unable to generate unique shorted_url')
}

const normalizeTargetUrl = (value) => {
  if (!value) return value;

  const trimmedValue = value.trim();
  if (!trimmedValue) return trimmedValue;
  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
};

export const ShortenerRouter = express.Router();

ShortenerRouter.get("/all", getShorteners);

ShortenerRouter.post("/shorted", async (req, res, next) => {
  try {
    const { url, user_id } = req.body;
    if (!url || !user_id) {
      throw new ErrorResponse(400, "need url | user_id!!")
    }

    const normalizedUrl = normalizeTargetUrl(url);
    const shortedUrl = await generateShortUrl();
    const result = await ShortenerDto.Insert(normalizedUrl, shortedUrl, user_id)
    res.json({
      message: "success",
      data: {
        ...result,
        shorted_url: shortedUrl,
      },
    })
  } catch (error) {
    next(error)
  }
})

ShortenerRouter.get("/:url", async (req, res, next) => {
  try {
    const { url } = req.params;
    const getUrlFromRedis = await GetRedis(String(url));
    console.log("redis url  ", getUrlFromRedis)

    let originalUrl;
    if (!getUrlFromRedis || getUrlFromRedis == null) {
      const checkUrl = await ShortenerDto.getOriginUrl(url)
      if (checkUrl.rowCount < 1) {
        next(createError(404));
      }
      originalUrl = checkUrl.rows[0].original_url
      await SetRedis(url, String(originalUrl));
    } else {
      originalUrl = getUrlFromRedis;
    }
    req.originalUrl = originalUrl;

    await AnaliticUrl(req)

    const targetUrl = normalizeTargetUrl(originalUrl);
    res.redirect(301, targetUrl)
  } catch (error) {
    next(error)
  }
})
