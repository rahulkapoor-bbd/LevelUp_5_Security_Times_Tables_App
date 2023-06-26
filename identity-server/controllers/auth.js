const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const fs = require('fs');

const publicKey = fs.readFileSync('public.key');
const privateKey = fs.readFileSync('private.key');

require('dotenv').config();

const { postUser, getUserDetailsFromEmail, getUserDetailsFromCode, updateUser, removeCode } = require('../dbHandler/dbUser');

let validCodes = [];
let validRefreshTokens = [];

async function generateCode(req, res) {
    const code = crypto.randomBytes(20).toString('hex');
    const { username, email, password } = req.body;

    // add to user to db with code
    const user = await getUserDetailsFromEmail(email);
    if (user[0]) {
        if (await bcrypt.compare(`${password}${process.env.pepper}`, user[0].password)) {
            console.log('Updating access code');
            // updateUser(email, code);
        } else {
            res.status(401);
            res.end();
            return;
        }

    } else {
        const hashedPassword = await bcrypt.hash(`${password}${process.env.pepper}`, 12);
        postUser(username, email, hashedPassword);
    }

    // make access code valid for 30s
    validCodes.push({ code: code, time: Date.now() + 30000 });

    // this needs to redirect to callback
    res.json({ code: code })
}

async function generateTokenFromCode(req, res) {
    // check if valid access code and create token
    // const validCode = await getUserDetailsFromCode(req.body.code);
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

    // validCode[0] && 
    if (!expired) {
        const newTokens = generateNewTokens(validCode[0].email, validCode[0].username);
        validRefreshTokens.push(newTokens.refreshToken);
        res.json(newTokens).end();
        return;
    }

    res.status(401);
    res.end();
}

async function refreshWithAccessToken(req, res) {
    const { refreshToken } = req.body;
    let foundToken = false;

    // remove refresh token from valid list
    for (let i = 0; i < validRefreshTokens.length; i++) {
        const obj = validRefreshTokens[i];
        if (obj === refreshToken) {
            foundToken = true;
            validRefreshTokens.splice(i, 1);
            break;
        }
    }

    if (!foundToken) {
        console.log('Invalid refresh token provided');
        res.status(401).end();
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, publicKey);

        const newTokens = generateNewTokens(decoded.email, decoded.username);
        validRefreshTokens.push(newTokens.refreshToken);

        res.status(200).json(newTokens);
        res.end();
    } catch (err) {
        // console.log(err);
        res.status(401).end();
    }
}

async function validateToken(req, res) {
    const { token } = req.body;

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
    const { token, refreshToken } = req.body;

    try {
        const decoded = jwt.verify(token, publicKey);
        for (let i = 0; i < validRefreshTokens.length; i++) {
            const obj = validRefreshTokens[i];
            if (obj === refreshToken) {
                validRefreshTokens.splice(i, 1);
                break;
            }
        }
        res.status(200).end();
    } catch (err) {
        // console.log(err);
        res.status(401).end();
    }

}

function generateNewTokens(email, username) {
    const accessToken = jwt.sign({
        email: email, username: username,
        iss: process.env.issuer, aud: process.env.audience, grant_type: 'access_token'
    }, privateKey, { expiresIn: '10m', algorithm: 'RS256' });

    const refreshToken = jwt.sign({
        email: email, username: username,
        iss: process.env.issuer, aud: process.env.audience, grant_type: 'refresh_token'
    }, privateKey, { expiresIn: '60m', algorithm: 'RS256' });

    return { accessToken: accessToken, refreshToken: refreshToken };
}

module.exports = {
    generateCode,
    generateTokenFromCode,
    refreshWithAccessToken,
    validateToken,
    logoutUser,
}