const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const jsonfile = require('jsonfile');
const postmark = require('postmark');
const Mustache = require('mustache');
const homedir = './src/api';
const validation_mail_template = require( './mail_templates/validation_mail_template.js');
const removed_mail_template = require( './mail_templates/removed_mail_template.js');
const recover_mail_template = require( './mail_templates/recover_mail_template.js');

const app = express();
const TOKEN_PREFIX = 'hXDrV!a@aG$hH5$';
const userlist = homedir + '/database/userlist.json';
const tokenlist = homedir + '/database/tokenlist.json';
const sessionExpireTime = 60*60*1000; // 1 hour
const emailClient = new postmark.Client('9f522760-eca6-404c-a94b-940355256301');

const portNumber = 3001;
const url = {
  api: '/api',
  membership: '/membership',
  login: '/login',
  register: '/register',
  validate: '/validate',
  forgot: '/forgot',
  users: '/users',
  detail: '/detail',
  get_all: '/get_all',
  remove: '/remove',
  is_expired: '/is_expired'
};

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Generate random string
 /* https://stackoverflow.com/a/1349426/5669415

*/
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

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

    if(!result.isvalid) {
      const response = {
        "error": {
          "code": 403,
          "message": "Your email is not valid, please validate your email."
        }
      }
      res.status(response.error.code);
      res.send(response);
    }
    else {
      const randomString = Math.random() + new Date().getTime();
      const hash = CryptoJS.SHA256(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex);
      const response = {
        "error": false,
        "login_token": hash
      }
      const token = {
        "app_token": req.body.app_token,
        "login_token": hash,
        "username": result.username,
        "login_time": new Date().getTime(),
        "expire_time": new Date().getTime() + sessionExpireTime
      }
      const tokens = jsonfile.readFileSync(tokenlist);
      tokens.push(token);
      jsonfile.writeFileSync(tokenlist, tokens);
      res.send(response);
    }
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
  /* Register a new user
  /* Url: http://localhost:3001/api/membership/register
  /* Method: POST
  /* Request:
    {
      username: "newuser" // Required
      email: "newuser@example.com" // Required
      password: "12345678" // Required
      password_again: "12345678" // Required
    }
  /* Response:
    {
      error: false
    }

    {
      error: {
        code: 403,
        message: "Email or password wrong"
      }
    }
**/
app.post(url.api + url.membership + url.register, function (req, res) {

  const users = jsonfile.readFileSync(userlist);
  const result = users.find(function(user) {
    return user.email === req.body.email || user.username == req.body.username;
  });

  if (!result) {
    const randomString = Math.random() + new Date().getTime();
    const hash = CryptoJS.SHA256(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex);
    const response = {
      "error": false,
    }
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      isvalid: false,
      validationToken: hash
    }
    users.push(user);
    jsonfile.writeFileSync(userlist, users);

    const link = 'http://localhost:8080/guest/validate/'+hash;

    const html = Mustache.render(validation_mail_template, { link: link });

    emailClient.sendEmail({
      "From": "info@mustafaarikan.net",
      "To": user.email,
      "Subject": "Validation",
      "HtmlBody": html
    });
    res.send(response);
  } else {
    const response = {
      "error": {
        "code": 403,
        "message": "Username or email already exists."
      }
    }
    res.status(response.error.code);
    res.send(response);
  }
});

/**
  /* Validate email address
  /* Url: http://localhost:3001/api/membership/validate
  /* Method: POST
  /* Request:
    {
      validation_token: "0b076a49bd46e34bc137ada02e7ebf632ae8ec8470f84bedf210157ef4e0da43" // Required
    }
  /* Response:
    {
      error: false
    }

    {
      error: {
        code: 403,
        message: "Your validation record couldn't be found. Try to re-register."
      }
    }
**/
app.post(url.api + url.membership + url.validate, function (req, res) {

  const users = jsonfile.readFileSync(userlist);
  const result = users.find(function(user) {
    return user.validationToken === req.body.validation_token;
  });

  if (result) {
    const response = {
      "error": false,
    }
    const new_users = users.filter(function(user){
      return user.validationToken !== req.body.validation_token;
    });
    result.isvalid = true;
    new_users.push(result);
    jsonfile.writeFileSync(userlist, new_users);
    res.send(response);
  } else {
    const response = {
      "error": {
        "code": 403,
        "message": "Your validation record couldn't be found. Try to re-register."
      }
    }
    res.status(response.error.code);
    res.send(response);
  }
});


/**
  /* Recover password
  /* Url: http://localhost:3001/api/membership/forgot
  /* Method: POST
  /* Request:
    {
      email: "test@example.com" // Required
    }
  /* Response:
    {
      error: false
    }
**/
app.post(url.api + url.membership + url.forgot, function (req, res) {

  const users = jsonfile.readFileSync(userlist);
  const result = users.find(function(user) {
    return user.email === req.body.email;
  });

  if (result) {
    const new_users = users.filter(function(user){
      return user.email !== req.body.email;
    });
    const new_pass = makeid();
    result.password = new_pass;
    new_users.push(result);
    jsonfile.writeFileSync(userlist, new_users);
    const html = Mustache.render(recover_mail_template, {new_pass: new_pass});
    emailClient.sendEmail({
      "From": "info@mustafaarikan.net",
      "To": result.email,
      "Subject": "Your new password",
      "HtmlBody": html
    });
  }
  const response = {
    "error": false
  }
  res.send(response);
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
      "users": [{"username":"admin","email":"admin@example.com","password":"123"},{"username":"guest","email":"guest@domain.com","password":"guest123"}]
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
  /* Remove desired user,
  /* Url: http://localhost:3001/api/users/remove
  /* Method: POST
  /* Request:
    {
      username: "guest", // Required
      login_token: "94f9c3a3466bc89e384b41d41e37c103beaed02709e55b330b1a0499c852692e" // Required
    }
  /* Response:
    {
      error: false,
      users: [{"username":"admin","email":"admin@example.com","password":"123"}]
    }

    {
      error: {
        code: 403,
        message: "Session expired"
      }
    }
**/
app.post(url.api + url.users + url.remove, function (req, res) {

  if (isExpired(req)) {
    sessionExpiredError(res);
  }
  else {
    const users = jsonfile.readFileSync(userlist);
    const new_users = users.filter(function(user){
      return user.username !== req.body.username;
    });
    const user = users.find(function(user){
      return user.username === req.body.username;
    });
    const html = Mustache.render(removed_mail_template);
    jsonfile.writeFileSync(userlist, new_users);
    emailClient.sendEmail({
      "From": "info@mustafaarikan.net",
      "To": user.email,
      "Subject": "Account Removed",
      "HtmlBody": html
    });
    const response = {
      error: false,
      users: new_users
    }
    res.send(response);
  }
});

/**
  /* Get login details of user,
  /* Url: http://localhost:3001/api/users/detail
  /* Method: POST
  /* Request:
    {
      username: "guest", // Required
      login_token: "94f9c3a3466bc89e384b41d41e37c103beaed02709e55b330b1a0499c852692e" // Required
    }
  /* Response:
    {
      error: false,
      logins: [{"app_token":"5c17b65204d2940eec456ceaac18d9c9ed890079","login_token":"1b0550321556e711620eb6f08e1de1bf464859c3108441f4060bb0fa978b4409","username":"admin","login_time":1499450554300,"expire_time":1499454154300}]
    }

    {
      error: {
        code: 403,
        message: "Session expired"
      }
    }
**/
app.post(url.api + url.users + url.detail, function (req, res) {

  if (isExpired(req)) {
    sessionExpiredError(res);
  }
  else {
    const tokens = jsonfile.readFileSync(tokenlist);
    const logins = tokens.filter(function(token){
      return token.username === req.body.username;
    });

    const response = {
      error: false,
      logins: logins
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
