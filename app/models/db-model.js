//var url = 'mongodb://80.93.177.208:27017/ERIO';
var login = require('../config').dbLogin;
var pass = require('../config').dbPass;
var adress = require('../config').dbIp;
var url = 'mongodb://'+login+':'+pass+'@'+adress;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect(url, { server: { reconnectTries: Number.MAX_VALUE } })//конектимсся к БД
var multer = require('multer');
var upload = multer({dest: '../src/buffer'});
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);


module.exports.multer = multer;
module.exports.db = db;
module.exports.upload = upload;
module.exports.fs = fs;
module.exports.gfs = gfs; 
module.exports.url = url;
