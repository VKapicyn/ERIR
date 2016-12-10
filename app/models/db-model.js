var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://80.93.177.208:27017/ERIO")//конектимсся к БД
var multer = require("multer");
var upload = multer({dest: './src/buffer'});
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);


module.exports.db = db;
module.exports.upload = upload;
module.exports.fs = fs;
module.exports.gfs = gfs; 
