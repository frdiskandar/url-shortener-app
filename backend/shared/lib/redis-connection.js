import { logger } from "../utils/logger"

const Redis = require("redis")
const { config } = require("../utils/config")

const client = Redis.createClient({
  url: `redis://${config.REDIS_USER}:${config.REDIS_PASSWORD}@${config.REDIS_HOST}:${config.REDIS_PORT}`
})

export const SetRedis = async (key, value) => {
  client.on('error', (err) => {logger.err("redis client error: ", err)})
  try {
    await client.connect();
    await client.set(key, value, {expiration: '1m'})
    return 
  } catch (error) {
    logger.error("redis client error: ", error)
    throw error
  }finally{
    client.close();
  }
}
export const GetRedis = async (key) => {
 client.on('error', (err) => {logger.err("redis client error: ", err)})
  try {
    await client.connect();
    const value = await client.get(key)
    return value
  } catch (error) {
    logger.error("redis client error: ", error)
    throw error
  }finally{
    client.close();
  }
}