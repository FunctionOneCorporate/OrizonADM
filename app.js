/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('dotenv').config();

var path = require('path');
var express = require('express');
var session = require('express-session');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var questionsRouter = require('./routes/question');
var questionCatalogRouter = require('./routes/questionCatalog');
var questionBranching = require('./routes/questionBranching');
var userConversation = require('./routes/userConversation');
const {createProxyMiddleware} = require("http-proxy-middleware");

// initialize express
var app = express();
console.log(process.env.DATABASE_URL)
/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // set this to true on production
    }
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);

app.use(
    function isAuthenticated(req, res, next) {
        if (!req.session.isAuthenticated) {
            return res.redirect('/auth/signin'); // redirect to sign-in route
        }
        if (!req.session.accessToken) {
            return res.redirect('/auth/acquireToken'); // redirect to sign-in route
        }
        next();
    }
)
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/questionCatalog', questionCatalogRouter);
app.use('/questionBranching', questionBranching);
app.use('/userConversation', userConversation);
app.use(express.static(path.join(__dirname, 'public')));

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

if (process.env.APP_CONFIG_APP_URL && process.env.APP_CONFIG_APP_URL !== process.env.APP_HOST) {

    const frontProxy = createProxyMiddleware({

        target: process.env.APP_CONFIG_APP_URL,

        changeOrigin: true,

        ws: true,

    });

    app.use(frontProxy);

}

module.exports = app;
