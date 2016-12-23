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
    var new_rep = new Report;

    Company.findOne({name: req.body.company}).then(function(result){   
        getStatic(function(res, parse){
        let stat = parse(res);
        new_rep.accept = '0';
        new_rep.date = new Date();
        new_rep.name = req.body.report_name;
        new_rep.year = req.body.report_year;
        new_rep.comapny = result.company;
        new_rep.sector = result.sector;
        new_rep.company_id = result._id;

        var standarts = [];
        for(let i=0; i<stat.standarts.length; i++){
            if (req.body[stat.standarts[i]] != undefined)
                {
                    standarts.push(req.body[stat.standarts[i]]);
                }
        }
        new_rep.standarts = standarts;

        new_rep.BusinessModel = req.body.BusinessModel;
        new_rep.Strategy = req.body.Strategy;
        new_rep.RiskMap = req.body.RiskMap;
        new_rep.Assurance = req.body.Assurance;
        new_rep.Stakes = req.body.Stakes;
        new_rep.interactive = req.body.interactive;

        new_rep.fin_auditor = req.body.fin_auditor != '' ? req.body.fin_auditor : undefined;
        new_rep.auditor = req.body.auditor != '' ? req.body.auditor : undefined;
        new_rep.consultant = req.body.consultant != '' ? req.body.consultant : undefined;
        new_rep.manager = req.body.manager != '' ? req.body.manager : undefined;
        new_rep.designer = req.body.designer != '' ? req.body.designer : undefined;
        new_rep.pages = req.body.pages != '' ? req.body.pages : undefined;
        new_rep.wins = req.body.wins != '' ? req.body.wins : undefined;

        new_rep.user_FIO = req.body.registrator_fio;
        new_rep.user_position = req.body.registrator_position;
        new_rep.user_telphone = req.body.registrator_email;
        new_rep.user_email = req.body.registrator_phone;

        console.log(req.body);
        console.log('files '+req.files);

        

        //лого
        //req.files.upload_preview.mv('src/buffer/' + new_rep._id + req.files.upload_preview.name, function (err) { console.log('ttts') });
        //var writestream = gfs.createWriteStream({
        //    filename: new_rep._id + req.files.upload_preview.name
        //});
        //fs.createReadStream('src/buffer/' + new_rep._id + req.files.upload_preview.name)
        //    .on('end', function () { fs.unlink('src/buffer/' + new_rep._id + req.files.upload_preview.name, function (err) { console.log("success") }) })
        //    .on('err', function () { console.log('Error uploading image') })
        //    .pipe(writestream);
        //writestream.on('close', function (file) {
        //    console.log(file.filename + ' Written To DB');
        //});
        //new_rep.preview = '/' + new_rep.id + req.files.upload_preview.name;
//
        //console.log('okeyushki 1');
        //console.log(new_rep);
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

        
        new_rep.save();
        result.reports.unshift(new_rep._id);
        result.save();

        res.redirect('/');
        });
    });
};

exports.getReportById = function (req, res){
    getStatic(function(result, parse){
        var stat = parse(result);
        Report.findOne({_id:new ObjectId(req.params.id)}).then(function (_report){
            Report.find({_id:_report.company_id}).then(function (reports, err){
                res.render('report', {
                    report:_report, 
                    reports:reports, 
                    admin: req.session.user, 
                    best: stat.best
                });
            });
	    });
    }); 
};

