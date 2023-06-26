const { connect } = require('./dbConnection');

async function postUser(username, email, password) {
    const sql = `INSERT INTO Users(email, username, password) VALUES (?);`;

    const connection = await connect();
    connection.query(sql, [[email, username, password]]);
}

async function getUserDetailsFromUsername(username) {
    const sql = `SELECT * FROM Users WHERE username = ?;`;

    const connection = await connect();
    const response = await connection.query(sql, [username]);
    return response[0];
}

async function getAllUsernames() {
    const sql = `SELECT username FROM Users;`;

    const connection = await connect();
    const response = await connection.query(sql);
    return response[0];
}

async function existingUsername(username) {
    const sql = `SELECT 1 FROM Users WHERE username = ?;`;

    const connection = await connect();
    const response = await connection.query(sql, [username]);
    return response[0];
}

module.exports = {
    postUser,
    getUserDetailsFromUsername,
    getAllUsernames,
    existingUsername,
}