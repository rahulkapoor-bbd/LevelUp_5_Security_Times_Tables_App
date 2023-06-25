const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const fs = require('fs');

const publicKey = fs.readFileSync('public.key');
const privateKey = fs.readFileSync('private.key');

require('dotenv').config();

const { postUser, getUserDetailsFromEmail, getUserDetailsFromCode, updateUser, removeCode } = require('../dbHandler/dbUser');

let validCodes = [];

async function generateCode(req, res) {
    const code = crypto.randomBytes(20).toString('hex');
    const { username, email, password } = req.body;

    // add to user to db with code
    const user = await getUserDetailsFromEmail(email);
    if (user[0]) {
        if (await bcrypt.compare(`${password}${process.env.pepper}`, user[0].password)) {
            console.log('Updating access code');
            updateUser(email, code);
        } else {
            res.status(401);
            res.end();
            return;
        }

    } else {
        const hashedPassword = await bcrypt.hash(`${password}${process.env.pepper}`, 12);
        postUser(username, email, hashedPassword, code);
    }

    validCodes.push({ code: code, time: Date.now() + 30000 });

    // this needs to redirect to callback
    res.json({ code: code })
}

async function generateToken(req, res) {
    // check if valid access code and create token
    const validCode = await getUserDetailsFromCode(req.body.code);
    let expired = true;
    for (let i = 0; i < validCodes.length; i++) {
        const obj = validCodes[i];
        if (obj.code === req.body.code) {
            if (obj.time > Date.now()) {
                expired = false;
            }
            validCodes.splice(i, 1);
            break;
        }
    }

    if (validCode[0] && !expired) {

        // , iss: process.env.issuer, aud: process.env.audience
        const token = jwt.sign({
            email: validCode[0].email, username: validCode[0].username,
            iss: process.env.issuer, aud: process.env.audience
        }, privateKey, { expiresIn: '10m', algorithm: 'RS256' });

        res.json({ accessToken: token });
        return;
    }

    res.status(401);
    res.end();
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