var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;
var getStatic = require('../models/staticModel').getStatic;


exports.registerReportPage = function (req, res){
    getStatic(function(result, parse){
        var stat = parse(result);
        Company.find({}).then(function (_company){
            res.render('register-report',{
                year:stat.year, 
                size_of_company: stat.size_of_company, 
                opf: stat.opf, 
                type_of_ownership: stat.type_of_ownership, 
                standarts: stat.standarts, companies:_company});
        });
    });
};

exports.addReport = function (req, res){
    var new_rep = {};

    Company.findOne({name: req.body.company}).then(function(result){
        new_rep.name = req.body.report_name;
        new_rep.comapny = req.body.Company;
        new_rep.IRRC = req.body.IRRC;
        new_rep.GRI = req.body.GRI;
        new_rep.A1000SES = req.body.A1000SES;
        new_rep.A1000APS = req.body.A1000APS;
        new_rep.BUSMOD = req.body.BUSMOD;
        new_rep.Strategy = req.body.Strategy;
        new_rep.Risks = req.body.Risks;
        new_rep.Assurance = req.body.Assurance;
        new_rep.Stakes = req.body.Stakes;
        new_rep.FinAud = req.body.FinAud;
        new_rep.NonFinAud = req.body.NonFinAud;
        new_rep.Consultant = req.body.Consultant;

        console.log(new_rep.name);
        console.log(req.body);
        console.log(req.files);

        console.log('okeyushki 1');
        //лого
//        req.files.upload[0].mv('src/buffer/' + new_rep._id + req.files.upload[0].name, function (err) { console.log('ttts') });
//        var writestream = gfs.createWriteStream({
//            filename: new_rep._id + req.files.upload[0].name
//        });
//        fs.createReadStream('src/buffer/' + new_rep._id + req.files.upload[0].name)
//            .on('end', function () { fs.unlink('src/buffer/' + new_rep._id + req.files.upload[0].name, function (err) { console.log("success") }) })
//            .on('err', function () { console.log('Error uploading image') })
//            .pipe(writestream);
//        writestream.on('close', function (file) {
//            console.log(file.filename + ' Written To DB');
//        });

        console.log('okeyushki 2');
        //отчет ru
//        req.files.upload[1].mv('src/buffer/'+new_comp._id+req.files.upload[1].name, function (err) {console.log('ttts')});
//        writestream = gfs.createWriteStream({
//        filename: new_rep._id+req.files.upload[1].name
//        });
//        fs.createReadStream('src/buffer/'+new_rep._id+req.files.upload[1].name)
//        .on('end', function(){fs.unlink('src/buffer/'+new_rep._id+req.files.upload[1].name, function(err){console.log("success")})})
//            .on('err', function(){ console.log('Error uploading image')})
//            .pipe(writestream);
//        writestream.on('close', function (file){
//            console.log(file.filename + ' Written To DB');
//        });

        console.log('okeyushki 3');
       
        result.reports.unshift(new_rep);
        result.save();
        res.redirect('/');
    });
};

exports.getReportById = function (req, res){
    getStatic(function(result, parse){
        var stat = parse(result);
        Report.findOne({_id:new ObjectId(req.params.id)}).then(function (_report){
            Report.find({company:_report.company}).then(function (reports){
                res.render('report', {report:_report, reports:reports, admin: req.session.user, best: stat.best});
            });
	    });
    }); 
};

