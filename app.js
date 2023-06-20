const express = require('express');
const path = require('path');

const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const timestablegameRouter = require('./routes/timestablegame');
const leaderboardRouter = require('./routes/leaderboard');
const personalscoresRouter = require('./routes/personalscores');

const identityServer = require('./identity-server/identity-server');
const resourceServer = require('./resource-server/resource-server');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/timestablegame', timestablegameRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/personalscores', personalscoresRouter);

app.post('/', (req, res) => {
    const { username, password } = req.body;

    const isAuthenticated = identityServer.authenticate(username, password);

    if (isAuthenticated) {
        res.redirect('/timestablegame');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

module.exports = app;
