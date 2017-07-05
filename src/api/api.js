const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const jsonfile = require('jsonfile');

const app = express();
const TOKEN_PREFIX = 'hXDrV!a@aG$hH5$';
const homedir = './src/api';
const userlist = homedir + '/database/userlist.json';

const portNumber = 3001;
const url = {
  api: '/api',
  membership: '/membership',
  login: '/login'
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
  /* Url: http://localhost:3001/api/membership/login
  /* Method: POST
  /* Request:
    {
      username: "admin" // Required
      password: "123" // Required
    }
  /* Response:
    {
      error: false,
      login_token: 88d96cf4866ed1f519f3a6d3b094f0d7d4fbd2f9
    }

    {
      error: {
        code: 403,
        message: "Username or password wrong"
      }
    }
**/
app.post(url.api + url.membership + url.login, function (req, res) {

  const users = jsonfile.readFileSync(userlist);
  const result = users.find(function(user) {
    return user.username === req.body.username && user.password == req.body.password;
  });

  if (result) {
    const randomString = Math.random() + new Date().getTime();
    const hash = CryptoJS.SHA256(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex);
    const response = {
      "error": false,
      "login_token": hash
    }
    res.send(response);

  } else {
    const response = {
      "error": {
        "code": 403,
        "message": "Username or password wrong"
      }
    }
    res.status(response.error.code);
    res.send(response);
  }
})

app.listen(portNumber, function () {
  console.log('Express api listening on port ' + portNumber )
})
