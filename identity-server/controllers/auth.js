const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const fs = require('fs');

const publicKey = fs.readFileSync('public.key');
const privateKey = fs.readFileSync('private.key');

require('dotenv').config();

const { postUser, getUserDetailsFromUsername, existingUsername } = require('../dbHandler/dbUser');

let validCodes = [];
let validRefreshTokens = [];

async function registerNewUser(req, res) {
    const { username, email, password } = req.body;

    const existingUser = await existingUsername(username);

    if (!existingUser[0]) {
        const hashedPassword = await bcrypt.hash(`${password}${process.env.pepper}`, 12);
        postUser(username, '', hashedPassword);

        // res.status(200).end();
        res.redirect(`http://localhost:80/login`)
        return;
    }
    res.status(401).end();
}

async function generateCode(req, res) {
    const code = crypto.randomBytes(20).toString('hex');
    const { username, email, password } = req.body;

    // add to user to db with code
    const user = await getUserDetailsFromUsername(username);
    if (user[0]) {
        if (!await bcrypt.compare(`${password}${process.env.pepper}`, user[0].password)) {
            res.status(401).end();
            return;
        }

    } else {
        res.status(401).end();
        return;
    }

    // make access code valid for 30s
    validCodes.push({ code: code, time: Date.now() + 30000, email: email, username: username });

    // this needs to redirect to callback
    res.redirect(`http://localhost:8080/callback/${code}`);
    // res.json({ code: code }).end();
}

async function generateTokenFromCode(req, res) {
    // check if valid access code
    let expired = true;
    let obj;
    for (let i = 0; i < validCodes.length; i++) {
        obj = validCodes[i];
        if (obj.code === req.body.code) {
            if (obj.time > Date.now()) {
                expired = false;
            }
            validCodes.splice(i, 1);
            break;
        }
    }

    // create tokens if valid access code
    if (!expired) {
        const newTokens = generateNewTokens(obj.email, obj.username);
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

    // create new tokens 
    try {
        const decoded = jwt.verify(refreshToken, publicKey);

        const newTokens = generateNewTokens(decoded.email, decoded.username);
        validRefreshTokens.push(newTokens.refreshToken);

        res.status(200).json(newTokens).end();
    } catch (err) {
        res.status(401).end();
    }
}

async function validateToken(req, res) {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, publicKey);

        if (decoded.grant_type !== 'access_token') {
            res.status(401).json({ valid: false }).end();
            return;
        }

        res.status(200).json({ valid: true }).end();
    } catch (err) {
        res.status(401).json({ valid: false }).end();
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
    registerNewUser,
    generateCode,
    generateTokenFromCode,
    refreshWithAccessToken,
    validateToken,
    logoutUser,
}