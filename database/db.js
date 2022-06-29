const mssql = require('mssql');

const pool = new mssql.ConnectionPool({
    "server": 'rik-sql-01.database.windows.net',
    "user": 'rik-admin',
    "password": 'Pd72ù44!mfo$dj',
    "database": 'rik-db-01 ',
    "port": 1433
});

module.exports  = pool;
