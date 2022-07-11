var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

//mongoose connect
mongoose.connect('mongodb://localhost/bookStores', (err) => {
  console.log('connected', err ? err : 'true')
})

var indexRouter = require('./routes/index');
var v1BooksRouter = require('./routes/book');
var v2CommentRouter = require('./routes/comment')
var v3CategoryRouter = require('./routes/category')
let v4TagRouter = require('./routes/tag')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/v1/Books', v1BooksRouter);
app.use('/api/v2/Comments', v2CommentRouter);
app.use('/api/v3/Category', v3CategoryRouter);
app.use('/api/v4/Tag', v4TagRouter);

module.exports = app;
