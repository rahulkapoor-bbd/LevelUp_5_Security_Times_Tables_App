import { Router } from 'express';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
const router = Router();
config();

router.get('/:code', async function (req, res, next) {
    const code = req.params['code'];

    const response = await fetch(`${process.env.IDENTITY_URL}/identity/accessToken`, {
        method: 'POST',
        body: `code=${code}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const tokens = await response.json();

    req.session.accessToken = tokens.accessToken;
    req.session.refreshToken = tokens.refreshToken;

    req.session.username = jwt.decode(tokens.accessToken).username;

    res.redirect('/playgame');
});

export default router;
