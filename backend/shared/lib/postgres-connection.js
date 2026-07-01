import pg from 'pg'
import { config } from '../utils/config.js';
import { logger } from '../utils/logger.js';

const { Pool } = pg

const pool = new Pool({
  host: config.POSTGRES_HOST,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DATABASE,
})

export const query = async (q, params) => {
  const start = Date.now();

  try {
    const res = await pool.query(q, params);
    const duration = Date.now() - start;
    logger.info('Executed query', { q, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}