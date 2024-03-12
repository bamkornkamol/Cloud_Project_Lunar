//Database Configuration

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'lunar-db.cjygw2mieoqy.ap-southeast-1.rds.amazonaws.com',
  user: 'root',
  password: '1234',
  database: 'lunar',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;