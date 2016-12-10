var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Report = require('../models/reportModel').reportModel;
var Static = require('../models/staticModel').staticModel;


exports.registerReportPage = function (req, res){
  res.render('register-report');
};

exports.addReport = function (req,res){
    
};

exports.getReportById = function (req, res){

    Report.findOne({_id:new ObjectId(req.params.id)}).then(function (_report){
        Report.find({company:_report.company}).then(function (reports){
            if (_report.accept==1)
                res.render('report', {report:_report,  reports:reports});
            else
                res.send('Отчет не прошел проверку у администрации ресурса');
        });
	}); 
};

