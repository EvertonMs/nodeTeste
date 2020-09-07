const mssql = require('mssql');

var pool = mssql.ConnectionPool({
"user":process.env.MSSQL_USER,
"password":process.env.MSSQL_PASSWORD,
"database":process.env.MSSQL_DATABASE,
"host":process.env.MSSQL_HOST,
"port":process.env.MSSQL_PORT
});


exports.pool = pool;
