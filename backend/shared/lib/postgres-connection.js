const pg = require('pg')
const { config } = require('../utils/config')
const { logger } = require('../utils/logger')
const { Pool } = pg

const pool = new Pool({
  host: config.POSTGRES_HOST,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DATABASE,
  max: 5,
  idleTimeoutMillis: 30000,         // Close idle clients after 30 seconds (Default is 30000)
  connectionTimeoutMillis: 2000,    // Return an error if a connection takes over 2 seconds (Default is 0 / no timeout)
})

const query = async (q, params) => {
  const start = new Date.now();

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

module.exports = query;