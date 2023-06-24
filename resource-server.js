const express = require('express');
const path = require('path');

const playgameRouter = require('./routes/playgame');
const timestablegameRouter = require('./routes/timestablegame');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/playgame', playgameRouter);
app.use('/timestablegame', timestablegameRouter);
app.use('/leaderboard', leaderboardRouter);

app.listen(port, () => {
  console.log(`Resource server is running on port ${port}.`);
});