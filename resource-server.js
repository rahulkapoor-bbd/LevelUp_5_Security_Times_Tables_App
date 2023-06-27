import express, { json, urlencoded } from 'express';
import session from 'express-session';
import { join } from 'path';
import playgameRouter from './routes/playgame.js';
import timestablegameRouter from './routes/timestablegame.js';
import leaderboardRouter from './routes/leaderboard.js';
import callback from './routes/callback.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const publicKey = fs.readFileSync('public.key');

const app = express();

const port = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join('public')));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use('/callback', callback)
app.use('/playgame', playgameRouter);
app.use('/timestablegame', timestablegameRouter);
app.use('/leaderboard', leaderboardRouter);

app.listen(port, () => {
  console.log(`Resource server is running on port ${port}.`);
});

export const validateToken = (tokenString) => {
  const token = tokenString;

  try {
    const decoded = jwt.decode(token, publicKey);

    if (decoded.grant_type !== 'access_token') {
      return false;
    }

    return decoded;
  } catch (err) {
    return undefined;
  }
}