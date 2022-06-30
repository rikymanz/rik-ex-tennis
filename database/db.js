const mysql = require("mysql");
require('dotenv').config();


var connection  = mysql.createPool({
  connectionLimit : 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_SCHEMA,
});



module.exports = connection;