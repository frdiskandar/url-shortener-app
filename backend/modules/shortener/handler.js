import { ServiceGetShortener } from "./service.js"

export const getShorteners = async (req, res , next) => {
  try {
    const result = await ServiceGetShortener(req)
    res.json({
      data: result.rows
    })
  } catch (error) {
    next(error)
  }
}