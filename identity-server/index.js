const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 80;
const app = express();

const { registerNewUser, generateCode, generateTokenFromCode, refreshWithAccessToken, validateToken, logoutUser } = require('./controllers/auth')
const { register, login } = require('./controllers/pages')

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join('public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/identity/register', registerNewUser);
app.post('/identity/login', generateCode);
app.post('/identity/accessToken', generateTokenFromCode);
app.post('/identity/refreshToken', refreshWithAccessToken);
app.post('/identity/logout', logoutUser);
app.post('/identity/validate', validateToken);
app.get('/register', register);
app.get('/login', login);

app.listen(PORT);
console.log(`Running at Port ${PORT}`);