import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';

import connectMongooseDB from './config/mongoose-config';
import passportConfig from './config/passport';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// Config dot env to load environment variables.
const result = dotenv.config();
if (result.error) {
  throw result.error
}

//Database connection initialization
global.mongooseConnection = connectMongooseDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportConfig(passport);

// Routes
app.use('/', indexRouter);
app.use("/api/users", passport.authenticate('jwt', {session: false}), usersRouter);
// app.use("/api/products", passport.authenticate('jwt', {session: false}), usersRouter);
// app.use("/messages", messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports =  app;
