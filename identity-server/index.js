const express = require("express");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const app = express();

const { generateCode, generateToken, validateToken } = require('./controllers/auth')

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/identity/authorizationcode', generateCode);
app.post('/identity/accessToken', generateToken);
app.get('/identity/validate', validateToken);

app.listen(PORT);
console.log(`Running at Port ${PORT}`);