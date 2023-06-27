import express, { json, urlencoded } from 'express';
import session from 'express-session';
import { join } from 'path';
import playgameRouter from './routes/playgame.js';
import timestablegameRouter from './routes/timestablegame.js';
// import leaderboardRouter from './routes/leaderboard.js';
import callback from './routes/callback.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import fetch from 'node-fetch'

dotenv.config();

const publicKey = fs.readFileSync('public.key');
import homeRouter from './routes/home.js';
import registerRouter from './routes/register.js'
import loginRouter from './routes/login.js'

const app = express();

const port = process.env.PORT || 8080;

const invalid_tokens = [];

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join('public')));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use('/', homeRouter);
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/callback', callback)
app.use('/playgame', playgameRouter);
app.use('/timestablegame', timestablegameRouter);
// app.use('/leaderboard', leaderboardRouter);

app.listen(port, () => {
  console.log(`Resource server is running on port ${port}.`);
});

export const validateToken = (tokenString, refrestTokenString) => {
  const token = tokenString;
  try {
    const decoded = jwt.verify(token, publicKey);

    if (decoded.grant_type !== 'access_token' || tokenString in invalid_tokens) {
      return false;
    }
    return decoded;
  } catch (err) {
    console.log(err);
    return checkRefreshToken(refrestTokenString);
  }
}

export const checkRefreshToken = async (refrestTokenString) => {

  const response = await fetch(`${process.env.IDENTITY_URL}/identity/refreshToken`, {
    method: 'POST',
    body: `refreshToken=${refrestTokenString}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log(response);

  const tokens = await response.json();

  if (response.status == 401) {
    return false;
  } else {
    return {accessToken:tokens.accessToken ,refreshToken:tokens.refreshToken};
  }

}

export const invalidateToken = (token) => {
  invalid_tokens.push(token);
}
