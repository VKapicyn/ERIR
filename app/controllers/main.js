var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Report = require('../models/reportModel').reportModel;


exports.mainPage = function (req, res){
  //заменить сортировку по accept .where('accept','1')
  Report.find({}).sort({date : 'desc'}).exec(function (err, docs){ 
    res.render('main', {new_reports: docs});
  });
};
