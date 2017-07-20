var express = require('express');
var bodyParser = require('body-parser');
var babel_es6 = require('babel-core/register');
var es6 = require('./server');
var dbModel = require('./app/models/db-model');
var app = express();
var mongoose = require("mongoose");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



app.use(session({
  secret: 'ERIO da-strateg',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ 
    url: require('./app/models/db-model').url
  })
}));

app.use(bodyParser());
app.use(express.static('./src/buffer'));                                                                
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));                                                                                                    
app.set('views', './app/views');
app.set('view engine', 'jade');

app.use('/', require('./router'));


let port = require('./app/config.js').port;
app.listen(port);
let kek = __dirname;
console.log(kek);
console.log(`Server started on port ${port}`);