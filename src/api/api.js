const express = require('express');
const app = express();
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

app.post(url.api + url.membership + url.login, function (req, res) {
  var response = {
    username: 'admin',
    login_token: 'sladkasldkasldkasldk'
  }
  res.send(response);
})

app.listen(portNumber, function () {
  console.log('Express api listening on port ' + portNumber )
})
