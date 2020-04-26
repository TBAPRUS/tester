const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const user = require('./middleware/user');
const validate = require('./middleware/validate');

const login = require('./routes/login');
const register = require('./routes/register');
const users = require('./routes/users');
const test = require('./routes/test')

const main = require('./routes/main');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ 
  extended: true,
  limit: '50mb'
}));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);

app.get('/getuser', users.test);

app.post('/login', login.submit);
app.post('/register',
  validate.password,
  validate.name,
  register.submit);
app.get('/logout', validate.auth, login.logout);

app.post('/addtest', (req, res, next) => {
  if(req.user.admin) {
    next();
  } else {
    res.redirect('/')
  }
}, test.add)
app.post('/answer', validate.auth, test.testanswer)
app.get('/gettests/:page', validate.auth, test.gets)
app.get('/gettest/:id', validate.auth, test.get)

app.use(main);

module.exports = app;