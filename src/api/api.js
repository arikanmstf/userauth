const express = require('express');
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
const jsonfile = require('jsonfile');
const postmark = require('postmark');
const Mustache = require('mustache');
const config = require('../scripts/common/Config.js');
const validationMailTemplate = require('./mail_templates/validation_mail_template.js');
const removedMailTemplate = require('./mail_templates/removed_mail_template.js');
const recoverMailTemplate = require('./mail_templates/recover_mail_template.js');

const homedir = './src/api';
const app = express();
const TOKEN_PREFIX = 'hXDrV!a@aG$hH5$';
const userlist = `${homedir}/database/userlist.json`;
const tokenlist = `${homedir}/database/tokenlist.json`;
const sessionExpireTime = 60 * 60 * 1000; // 1 hour
const emailClient = new postmark.Client('9f522760-eca6-404c-a94b-940355256301');
const ErrorMessages = config.ErrorMessages;
const EMAIL_REGEX = config.EMAIL_REGEX;

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
    res.header('Access-Control-Allow-Origin', config.baseUrl);
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Generate random string
 /* https://stackoverflow.com/a/1349426/5669415

*/
function makeid () {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/** Basic pagination function

*/
function paginate (array, pageNumber) {
    pageNumber -= 1;
    return array.slice(pageNumber * config.RECORDS_PER_PAGE, (pageNumber + 1) * config.RECORDS_PER_PAGE);
}
/**
  /* Check if login token is expired or not.
**/
function isExpired (req) {
    const tokens = jsonfile.readFileSync(tokenlist);
    const currentDate = new Date();
    let expired = true;
    const result = tokens.find((token) => {
        return token.login_token === req.body.login_token && currentDate.getTime() < token.expire_time;
    });

    if (result) {
        expired = false;
    }
    return expired;
}
function sessionExpiredError (res) {
    const response = {
        error: {
            code: 403,
            message: ErrorMessages.SESSION_EXP
        }
    };
    res.status(response.error.code);
    res.send(response);
}

/* Validate email address */
function isValidEmail (email) {
    return email && EMAIL_REGEX.test(email);
}

/* Validate passwords */
function validatePassword (password, passwordAgain) {
    if (password !== passwordAgain) return ErrorMessages.PASSWORD_NOT_MATCH;
    else if (password.length < config.MIN_PASSWORD_LENGTH) return ErrorMessages.PASSWORD_TOO_SHORT;
    return false;
};

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
app.post(url.api + url.membership + url.login, (req, res) => {
    const users = jsonfile.readFileSync(userlist);
    if (!isValidEmail(req.body.email)) {
        const response = {
            error: {
                code: 403,
                message: ErrorMessages.CHECK_YOUR_MAIL
            }
        };
        res.status(response.error.code);
        res.send(response);
        return true;
    }
    const result = users.find((user) => {
        return user.email === req.body.email && user.password === req.body.password;
    });

    if (result) {
        if (!result.isvalid) {
            const response = {
                error: {
                    code: 403,
                    message: ErrorMessages.INVALID_ACCOUNT
                }
            };
            res.status(response.error.code);
            res.send(response);
        }
        else {
            const randomString = Math.random() + new Date().getTime();
            const hash = CryptoJS.SHA256(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex); // eslint-disable-line new-cap
            const response = {
                error: false,
                login_token: hash
            };
            const token = {
                app_token: req.body.app_token,
                login_token: hash,
                username: result.username,
                login_time: new Date().getTime(),
                expire_time: new Date().getTime() + sessionExpireTime
            };
            const tokens = jsonfile.readFileSync(tokenlist);
            tokens.push(token);
            jsonfile.writeFileSync(tokenlist, tokens);
            res.send(response);
        }
    }
    else {
        const response = {
            error: {
                code: 403,
                message: ErrorMessages.EMAIL_PW
            }
        };
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
app.post(url.api + url.membership + url.register, (req, res) => {
    const users = jsonfile.readFileSync(userlist);
    const result = users.find((user) => {
        return user.email === req.body.email || user.username === req.body.username;
    });
    const validatePwError = validatePassword(req.body.password, req.body.password_again);

    if(!isValidEmail(req.body.email)) {
        const response = {
            error: {
                code: 403,
                message: ErrorMessages.CHECK_YOUR_MAIL
            }
        };
        res.status(response.error.code);
        res.send(response);
        return true;
    }
    else if (validatePwError) {
        const response = {
            error: {
                code: 403,
                message: validatePwError
            }
        };
        res.status(response.error.code);
        res.send(response);
        return true;
    }

    if (!result) {
        const randomString = Math.random() + new Date().getTime();
        const hash = CryptoJS.SHA256(TOKEN_PREFIX + randomString).toString(CryptoJS.enc.Hex); // eslint-disable-line new-cap
        const response = {
            error: false
        };
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isvalid: false,
            validationToken: hash
        };
        users.push(user);
        jsonfile.writeFileSync(userlist, users);

        const link = `${config.baseUrl}/guest/validate/${hash}`;
        const html = Mustache.render(validationMailTemplate, { link });
        emailClient.sendEmail({
            From: 'info@mustafaarikan.net',
            To: user.email,
            Subject: 'Validation',
            HtmlBody: html
        });
        res.send(response);
    }
    else {
        const response = {
            error: {
                code: 403,
                message: ErrorMessages.UN_EXISTS
            }
        };
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
app.post(url.api + url.membership + url.validate, (req, res) => {
    const users = jsonfile.readFileSync(userlist);
    const result = users.find((user) => {
        return user.validationToken === req.body.validation_token;
    });

    if (result) {
        const response = {
            error: false
        };
        const newUsers = users.filter((user) => {
            return user.validationToken !== req.body.validation_token;
        });
        result.isvalid = true;
        newUsers.push(result);
        jsonfile.writeFileSync(userlist, newUsers);
        res.send(response);
    }
    else {
        const response = {
            error: {
                code: 403,
                message: ErrorMessages.VALIDATION_NOT_FOUND
            }
        };
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
app.post(url.api + url.membership + url.forgot, (req, res) => {
    const users = jsonfile.readFileSync(userlist);
    const result = users.find((user) => {
        return user.email === req.body.email;
    });
    if (!isValidEmail(req.body.email)) {
        const response = {
            error: {
                code: 403,
                message: ErrorMessages.CHECK_YOUR_MAIL
            }
        };
        res.status(response.error.code);
        res.send(response);
        return true;
    }

    if (result) {
        const newUsers = users.filter((user) => {
            return user.email !== req.body.email;
        });
        const newPass = makeid();
        result.password = newPass;
        newUsers.push(result);
        jsonfile.writeFileSync(userlist, newUsers);
        const html = Mustache.render(recoverMailTemplate, { new_pass: newPass });
        emailClient.sendEmail({
            From: 'info@mustafaarikan.net',
            To: result.email,
            Subject: 'Your new password',
            HtmlBody: html
        });
    }
    const response = {
        error: false
    };
    res.send(response);
});

/**
  /* Get all of the users,
  /* Url: http://localhost:3001/api/users/get_all
  /* Method: POST
  /* Request:
    {
      login_token: "94f9c3a3466bc89e384b41d41e37c103beaed02709e55b330b1a0499c852692e" // Required
      page_number: 3 // Optional, default 1
    }
  /* Response:
    {
      error: false,
      "users": [{"username":"admin","email":"admin@example.com","password":"123"},{"username":"guest","email":"guest@domain.com","password":"guest123"}],
      "total": 20
    }

    {
      error: {
        code: 403,
        message: "Session expired"
      }
    }
**/
app.post(url.api + url.users + url.get_all, (req, res) => {
    if (isExpired(req)) {
        sessionExpiredError(res);
    }
    else {
        const usersAll = jsonfile.readFileSync(userlist);
        const users = paginate(usersAll, req.body.page_number || 1);
        const total = usersAll.length;
        const response = {
            error: false,
            users,
            total
        };
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
app.post(url.api + url.users + url.remove, (req, res) => {
    if (isExpired(req)) {
        sessionExpiredError(res);
    }
    else {
        const users = jsonfile.readFileSync(userlist);
        const newUsers = users.filter((u) => {
            return u.username !== req.body.username;
        });
        const user = users.find((u) => {
            return u.username === req.body.username;
        });
        const html = Mustache.render(removedMailTemplate);
        jsonfile.writeFileSync(userlist, newUsers);
        emailClient.sendEmail({
            From: 'info@mustafaarikan.net',
            To: user.email,
            Subject: 'Account Removed',
            HtmlBody: html
        });
        const response = {
            error: false,
            users: newUsers
        };
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
      logins: [{"app_token":"5c17b65204d2940eec456ceaac18d9c9ed890079","login_token":
      "1b0550321556e711620eb6f08e1de1bf464859c3108441f4060bb0fa978b4409","username":"admin","login_time":1499450554300,
      "expire_time":1499454154300}]
    }

    {
      error: {
        code: 403,
        message: "Session expired"
      }
    }
**/
app.post(url.api + url.users + url.detail, (req, res) => {
    if (isExpired(req)) {
        sessionExpiredError(res);
    }
    else {
        const tokens = jsonfile.readFileSync(tokenlist);
        const logins = tokens.filter((token) => {
            return token.username === req.body.username;
        });
        const response = {
            error: false,
            logins
        };
        res.send(response);
    }
});

app.listen(config.API_PORT_NUMBER, () => {
    console.log(`Express api listening on port: ${config.API_PORT_NUMBER}`); // eslint-disable-line no-console
});
