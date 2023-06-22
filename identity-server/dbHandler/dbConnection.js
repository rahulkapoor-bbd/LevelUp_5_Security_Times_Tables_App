var mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: 'IdentityDB'
};

async function connect() {
    return mysql.createConnection(config);
}

module.exports = {
    connect,
}