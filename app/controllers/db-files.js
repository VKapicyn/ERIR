var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


exports.getFile = function (req, res){
       var readstream = gfs.createReadStream({filename: req.params.filename});
       readstream.on('error', function(err){
        res.send('No image found with that title');
       });
       readstream.pipe(res);
  };