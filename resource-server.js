import express, { json, urlencoded } from 'express';
import { join } from 'path';
import playgameRouter from './routes/playgame.js';
import timestablegameRouter from './routes/timestablegame.js';
import leaderboardRouter from './routes/leaderboard.js';

const app = express();

const port = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join('public')));


app.use('/playgame', playgameRouter);
app.use('/timestablegame', timestablegameRouter);
app.use('/leaderboard', leaderboardRouter);

app.listen(port, () => {
  console.log(`Resource server is running on port ${port}.`);
});
