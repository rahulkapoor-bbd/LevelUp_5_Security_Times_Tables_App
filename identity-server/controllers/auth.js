const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const fs = require('fs');

const publicKey = fs.readFileSync('public.key');
const privateKey = fs.readFileSync('private.key');

require('dotenv').config();

const { postUser, getUserDetailsFromEmail, getUserDetailsFromCode, updateUser, removeCode } = require('../dbHandler/dbUser');

async function generateCode(req, res) {
    const code = crypto.randomBytes(20).toString('hex');
    const { username, email, password } = req.body;

    // add to user to db with code
    const user = await getUserDetailsFromEmail(email);
    if (user[0]) {
        if (bcrypt.compare(`${password}${process.env.pepper}`, user[0].password)) {
            console.log('Updating access code');
            updateUser(email, code);
        } else {
            res.status(401);
            return;
        }

    } else {
        const hashedPassword = await bcrypt.hash(`${password}${process.env.pepper}`, 12);
        postUser(username, email, hashedPassword, code);
    }

    // this needs to redirect
    res.json({ code: code })
}

async function generateToken(req, res) {
    // check if valid access code and create token
    const validCode = await getUserDetailsFromCode(req.body.code);

    if (validCode[0]) {

        // , iss: process.env.issuer, aud: process.env.audience
        const token = jwt.sign({ email: validCode[0].email }, privateKey, { expiresIn: '10m', algorithm: 'RS256' });

        res.json({ accessToken: token });
    }
}

async function validateToken(req, res) {
    const token = req.body.token;

    // if expired need to do something to refresh
    // console.log(jwt.decode(token, privateKey));

    try {
        const decoded = jwt.verify(token, publicKey);
        // console.log(decoded);
        res.status(200).json({ valid: true });
    } catch (err) {
        // console.log(err);
        res.status(401).json({ valid: false });
    }
}

async function logoutUser(req, res) {
    const { token, email } = req.body;

    try {
        const decoded = jwt.verify(token, publicKey);
        // console.log(decoded);
        removeCode(email);
    } catch (err) {
        // console.log(err);
        res.status(401).json({ valid: false });
    }



}

module.exports = {
    generateCode,
    generateToken,
    validateToken,
}