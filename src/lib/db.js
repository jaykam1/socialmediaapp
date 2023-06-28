const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {    /* <----- Add SSL option */
    rejectUnauthorized: false,
  },
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}