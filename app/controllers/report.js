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
        getStatic(function(resul, parse){
        let stat = parse(resul);
        new_rep.accept = '0';
        new_rep.date = new Date();
        new_rep.name = req.body.report_name;
        new_rep.year = req.body.report_year;
        new_rep.company = req.body.company;
        new_rep.sector = result.sector;
        size_of_company = result.size_of_company;
        opf = result.opf;
        city = result.city;
        type_of_ownership = result.type_of_ownership;
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


        //лого
        var writestream = gfs.createWriteStream({
            filename: req.files['upload'][0].filename
        });
        fs.createReadStream(req.files['upload'][0].path)
            .on('end', function () { fs.unlink(req.files['upload'][0].path, function (err) { console.log("success") }) })
            .on('err', function () { console.log('Error uploading image') })
            .pipe(writestream);
        writestream.on('close', function (file) {
            console.log(file.filename + ' Written To DB');
        });
        new_rep.preview = '/' + req.files['upload'][0].filename;


        //отчет ru
        writestream = gfs.createWriteStream({
            filename: req.files['ru_PDF'][0].filename
        });
        fs.createReadStream(req.files['ru_PDF'][0].path)
            .on('end', function () { fs.unlink(req.files['ru_PDF'][0].path, function (err) { console.log("success") }) })
            .on('err', function () { console.log('Error uploading pdf_ru') })
            .pipe(writestream);
        writestream.on('close', function (file) {
            console.log(file.filename + ' Written To DB');
        });
        new_rep.doc_rus = '/' + req.files['ru_PDF'][0].filename;


        //отчет en
        if (req.files['en_PDF']!=undefined){
            writestream = gfs.createWriteStream({
                filename: req.files['en_PDF'][0].filename
            });
            fs.createReadStream(req.files['en_PDF'][0].path)
                .on('end', function () { fs.unlink(req.files['en_PDF'][0].path, function (err) { console.log("success") }) })
                .on('err', function () { console.log('Error uploading pdf_en') })
                .pipe(writestream);
            writestream.on('close', function (file) {
                console.log(file.filename + ' Written To DB');
            });
            new_rep.doc_en = '/' + req.files['en_PDF'][0].filename;
        }


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
            Report.find({company_id:_report.company_id}).then(function (reports, err){
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

exports.acceptReport = function (req, res){
        if (req.body.accept!=7){
        Report.findOne({_id:req.params.report_id}).then(function (report){
            report.accept = req.body.accept;
            report.save();
        });
    }
    res.redirect('/report/'+req.params.report_id);
}

