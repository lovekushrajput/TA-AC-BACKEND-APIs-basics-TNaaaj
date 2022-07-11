var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var v1Router = require('./routes/countries');
var v2Router = require('./routes/states');

//mongoose connect
mongoose.connect('mongodb://localhost/worlds', (err) => console.log(err ? err : 'connected true'))

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/v1/countries', v1Router);
app.use('/api/v2/states', v2Router);

module.exports = app;
