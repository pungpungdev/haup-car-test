const mysql = require('mysql2/promise')

/*const mySqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
})*/

const mySqlPool = mysql.createPool(process.env.DB_HOST)

module.exports = mySqlPool;