const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 80;
const app = express();

const { generateCode, generateTokenFromCode, refreshWithAccessToken, validateToken, logoutUser } = require('./controllers/auth')

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/identity/authorizationcode', generateCode);
app.post('/identity/accessToken', generateTokenFromCode);
app.post('/identity/refreshToken', refreshWithAccessToken);
app.post('/identity/logout', logoutUser);
app.post('/identity/validate', validateToken);

app.listen(PORT);
console.log(`Running at Port ${PORT}`);