const express = require('express');
const path = require('path');

const app = express();
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/register', registerRouter);

app.post('/auth', (req, res) => {
  const { username, password } = req.body;

  const validCredentials = true;

  if (validCredentials) {
    res.redirect('http://localhost:8080/timestablegame');
  } else {
    res.send('Invalid credentials');
  }
});

app.listen(port, () => {
  console.log(`Identity server is running on port ${port}.`);
});
