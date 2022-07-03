const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports.DATABASE = mysql.createPool({
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_SCHEMA,
    "port": process.env.DB_PORT
});
