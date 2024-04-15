const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'artalax01',
    database: 'haup_car'
})

module.exports = mySqlPool;