import express, { json, urlencoded } from 'express';
import { join } from 'path';

import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';
import timestablegameRouter from './routes/timestablegame.js';
import leaderboardRouter from './routes/leaderboard.js';

import identityServer from './identity-server/identity-server.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join('public')));

app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/timestablegame', timestablegameRouter);
app.use('/leaderboard', leaderboardRouter);

app.post('/', async (req, res) => {
    const { username, password } = req.body;

    const isAuthenticated = identityServer.authenticate(username, password);

    try {
        const isAuthenticated = identityServer.authenticate(username, password);

        if (isAuthenticated) {
            res.redirect('/timestablegame');
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.render('login', { error: 'Authentication error' });
    }
});

export default app;
