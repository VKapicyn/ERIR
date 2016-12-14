var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Report = require('../models/reportModel').reportModel;


exports.mainPage = function (req, res){
  //заменить сортировку по accept на сортировку по date
  // desc и asc - по убыванию и по возрастанию
  Report.find({}).sort({accept : 'desc'}).exec(function (err, docs){ 
    res.render('main', {new_reports: docs});
  });
};
