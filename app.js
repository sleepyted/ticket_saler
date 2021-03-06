var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var tokenService = require('./service/tokenService')
// var dbUtil = require('./db/base')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var tokenRouter = require('./routes/token')
var apiDispacher = require('./routes/apiDispacher')

var app = express();

//test sql execution
// var db = new dbUtil()
// // db.connect()
// db.query('select * from user').then(function(err,res){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(res)
//   }
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser());
// app.use(bodyParser.text());
// app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/token', tokenRouter)
app.use('/users', usersRouter);

let ts = new tokenService()
app.use(function (req, res, next) {
  console.log('req ------')
  console.log(req.path)
  console.log(req.url)
  console.log('------')
  if (req.path == '/api/token') {
    next()
    return
  }
  let auth = req.headers.auth
  if (auth && ts.checkToken(auth)) {
    console.log(ts.checkToken(auth))
    next()
  } else {
    // console.log(header)
    next(createError(404))
  }
})

app.use('/api', apiDispacher)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
