const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const jsonfile = require('jsonfile');

const app = express();
const TOKEN_PREFIX = 'hXDrV!a@aG$hH5$';
const homedir = './src/api';
const userlist = homedir + '/database/userlist.json';
const tokenlist = homedir + '/database/tokenlist.json';
const sessionExpireTime = 60*60*1000; // 1 hour

const portNumber = 3001;
const url = {
  api: '/api',
  membership: '/membership',
  login: '/login',
  users: '/users',
  get_all: '/get_all',
  is_expired: '/is_expired'
};

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
  /* Save a token to the tokenlist, login
  /* Url: http://localhost:3001/api/membership/login
  /* Method: POST
  /* Request:
    {
      email: "admin@example.com" // Required
      password: "123" // Required
      app_token: "a7202c464050e856d78a0350d05b0cbdbd478161" // Required
    }
  /* Response:
    {
      error: false,
      login_token: 88d96cf4866ed1f519f3a6d3b094f0d7d4fbd2f9
    }

    {
      error: {
        code: 403,
        message: "Email or password wrong"
      }
    }
**/
app.post(url.api + url.membership + url.login, function (req, res) {

  const users = jsonfile.readFileSync(userlist);
  const result = users.find(function(user) {
    return user.email === req.body.email && user.password == req.body.password;
  });

  if (result) {
    const randomString = Math.random() + new Date().getTime();
    const hash = CryptoJS.SHA256(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex);
    const response = {
      "error": false,
      "login_token": hash
    }
    const token = {
      "app_token": req.body.app_token,
      "login_token": hash,
      "email": req.body.email,
      "login_time": new Date().getTime(),
      "expire_time": new Date().getTime() + sessionExpireTime
    }
    const tokens = jsonfile.readFileSync(tokenlist);
    tokens.push(token);
    jsonfile.writeFileSync(tokenlist, tokens);
    res.send(response);
  } else {
    const response = {
      "error": {
        "code": 403,
        "message": "Email or password wrong"
      }
    }
    res.status(response.error.code);
    res.send(response);
  }
});

/**
  /* Get all of the users,
  /* Url: http://localhost:3001/api/users/get_all
  /* Method: POST
  /* Request:
    {
      login_token: "94f9c3a3466bc89e384b41d41e37c103beaed02709e55b330b1a0499c852692e" // Required
    }
  /* Response:
    {
      error: false,
      users: []
    }

    {
      error: {
        code: 403,
        message: "Session expired"
      }
    }
**/
app.post(url.api + url.users + url.get_all, function (req, res) {

  if (isExpired(req)) {
    sessionExpiredError(res);
  }
  else {
    const users = jsonfile.readFileSync(userlist);
    const response = {
      error: false,
      users: users
    }
    res.send(response);
  }
});

/**
  /* Check if login token is expired or not.
**/
function isExpired (req) {
    const tokens = jsonfile.readFileSync(tokenlist);
    const users = jsonfile.readFileSync(userlist);
    var _date = new Date();
    var expired = true;
    const result = tokens.find(function(token) {
      return token.login_token === req.body.login_token && _date.getTime() < token.expire_time;
    });

    if (result) {
      expired = false;
    }

    return expired;
};
function sessionExpiredError (res) {
  const response = {
    "error": {
      "code": 403,
      "message": "Session Expired"
    }
  }
  res.status(response.error.code);
  res.send(response);
}

app.listen(portNumber, function () {
  console.log('Express api listening on port ' + portNumber )
})
