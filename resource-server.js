const express = require('express');
const path = require('path');

const timestablegameRouter = require('./routes/timestablegame');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/timestablegame', timestablegameRouter);
app.use('/leaderboard', leaderboardRouter);

app.post('/', (req, res) => {
    const { username, password } = req.body;

    const isAuthenticated = identityServer.authenticate(username, password);

    if (isAuthenticated) {
        res.redirect('/timestablegame');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});