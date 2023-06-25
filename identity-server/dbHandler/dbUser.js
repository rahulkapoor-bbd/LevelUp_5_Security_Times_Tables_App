const { connect } = require('./dbConnection');

async function postUser(username, email, password, code) {
    const sql = `INSERT INTO Users(email, username, password, code) VALUES (?);`;

    const connection = await connect();
    connection.query(sql, [[email, username, password, code]]);
}

async function updateUser(email, code) {
    const sql = `UPDATE Users SET code = ? WHERE email = ?;`;
    const connection = await connect();

    connection.query(sql, [[code], [email]]);
}

async function getUserDetailsFromEmail(email) {
    const sql = `SELECT * FROM Users WHERE email = ?;`;

    const connection = await connect();
    const response = await connection.query(sql, [email]);
    return response[0];
}

async function getUserDetailsFromCode(code) {
    const sql = `SELECT email, username FROM Users WHERE code = ?;`;

    const connection = await connect();
    const response = await connection.query(sql, [code]);
    return response[0];
}

async function getAllUsers() {
    const sql = `SELECT * FROM Users;`;

    const connection = await connect();
    const response = await connection.query(sql);
    return response[0];
}

async function removeCode(email) {
    const sql = `UPDATE Users SET code = null WHERE email = ?`

    const connection = await connect();
    await connection.query(sql, [email]);
}

module.exports = {
    postUser,
    updateUser,
    getUserDetailsFromEmail,
    getUserDetailsFromCode,
    getAllUsers,
    removeCode,
}