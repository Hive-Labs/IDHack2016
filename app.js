var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var signin = require('./routes/signin');
var index = require('./routes/index');
var users = require('./routes/users');
var db = require('./models/db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 9000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Favicon for the site
app.use(favicon(path.join(__dirname, 'public', 'images', 'logo.jpg')));

app.use('/', signin);
app.use('/home', index);
app.use('/users', users);
// Edges JSON file
app.use('/api/edges', function(req, res) {
  db.HackEdges.find({}, function(err, data) {
    res.json(data);
  })
});
app.use('/api/names', function(req, res) {
  console.log("Hello");
  db.HackEdges.aggregate([{
    $group: {
      _id: "$label",
      refCount: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      refCount: -1
    }
  }], (err, result) => {
    res.json(result);
  });
});
// Each name
app.use('/api/virus/:name', function(req, res) {
  var name = req.params.name;
  db.HackEdges.find({
    label: name
  }, function(err, result) {
    res.json(result);
  });
});
// Get shit from Wikipedia
app.use('/api/wiki/:name', function(req, res) {
  var name = req.params.name;
  console.log(JSON.stringify(name));
  request.get({
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + name + '&format=json',
    json: true
  }, function(e, r, data) {
    console.log(data.query.search[0].title);
    console.log(e);
    request.get({
      url: 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=' + data.query.search[0].title + '&format=json',
      json: true
    }, function(e, r, data) {
      for (var page in data.query.pages) {
        res.json(data.query.pages[page].extract);
      }
    })
  })
});
// subscripe API
app.use('/api/subscribe/:name', function(req, res) {
  var title = req.params.name;
  db.HackEdges.update({
    label: title
  }, {
    $addToSet: {
      subscribers: 1
    }
  }, function(err, data) {
    console.log(res);
    res.json('OK');
  });
});
// Check if subscribed
app.use('/api/issubscribe/:name', function(req, res) {
  var title = req.params.name;
  db.HackEdges.find({
    label: title,
    subscribers: {
      $in: [1]
    }
  }, function(err, data) {
    console.log(err);
    res.json(data.length >= 1);
  });
});
// Job API
app.use('/api/jobs', function(req, res) {
  db.HackJobs.find({}, function(err, data) {
    if (err) console.log(err);
    console.log(data);
    res.json(data);
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get("port"));


module.exports = app;
