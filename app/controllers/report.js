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
    var new_rep = new Report;
    new_rep.name = req.body.report_name;
    console.log(new_rep.name);
    console.log(req.body);
    console.log(req.files);


     //cохраняем лого в БД
    /*req.files.upload_logo.mv('src/buffer/'+new_comp._id+req.files.upload_logo.name, function (err) {console.log('ttts')});

    var writestream = gfs.createWriteStream({
      filename: new_comp._id+req.files.upload_logo.name
    });

    fs.createReadStream('src/buffer/'+new_comp._id+req.files.upload_logo.name)
      .on('end', function(){fs.unlink('src/buffer/'+new_comp._id+req.files.upload_logo.name, function(err){console.log("success")})})
        .on('err', function(){ console.log('Error uploading image')})
          .pipe(writestream);

    writestream.on('close', function (file){
        console.log(file.filename + ' Written To DB');
    });*/
    new_rep.save();
    res.send('ok '+new_rep._id+' ');
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

