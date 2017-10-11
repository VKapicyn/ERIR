let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId; 
let dbModel = require('../models/db-model');
let db = dbModel.db;

import {fs, gfs, upload} from '../models/db-model';


let Company = require('../models/companyModel').companyModel;
let Report = require('../models/reportModel').reportModel;
let getStatic = require('../models/staticModel').getStatic;
let recaptcha = require('../models/recaptchaModel').recaptcha;


exports.registerReportPage = function (req, res){
    getStatic(function(result, parse){
        console.log(result);
        let stat = parse(result);
        Company.find({accept: 1}).then(function (_company){
            res.render('register-report',{
                year:stat.year, 
                size_of_company: stat.size_of_company, 
                opf: stat.opf, 
                type_of_ownership: stat.type_of_ownership, 
                standarts: stat.standarts, companies:_company
            });
        });
    });
};

exports.addReport = function (req, res){
    recaptcha.verify(req, function(error){
        if(!error){
            let new_rep = new Report;
            //console.log(req.body);
            //console.log(req.files);
            Company.findOne({$and: [{name: req.body.company},{accept:1}]}).then(function(result){  
                getStatic(function(resul, parse){
                let stat = parse(resul);
                //console.log('результат', result);
                new_rep.accept = '0';
                new_rep.date = new Date();
                new_rep.name = req.body.report_name;
                new_rep.year = req.body.report_year;
                new_rep.company = req.body.company;
                new_rep.sector = result.sector;
                new_rep.size_of_company = result.size_of_company;
                new_rep.opf = result.opf;
                new_rep.city = result.city;
                new_rep.type_of_ownership = result.type_of_ownership;
                new_rep.company_id = result._id;

                let standarts = [];
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
                new_rep.AssuranceZS = req.body.AssuranceZS;
                new_rep.Stakes = req.body.Stakes;
                new_rep.ZS = req.body.ZS;
                new_rep.interactive = req.body.interactive;

                new_rep.fin_auditor = req.body.fin_auditor != '' ? req.body.fin_auditor : undefined;
                new_rep.auditor = req.body.auditor != '' ? req.body.auditor : undefined;
                new_rep.consultant = req.body.consultant != '' ? req.body.consultant : undefined;
                new_rep.manager = req.body.manager != '' ? req.body.manager : undefined;
                new_rep.designer = req.body.designer != '' ? req.body.designer : undefined;
                new_rep.pages = req.body.pages != '' ? req.body.pages : undefined;
                new_rep.wins = req.body.wins != '' ? req.body.wins : undefined;
                new_rep.world_wins = req.body.world_wins != '' ? req.body.world_wins : undefined;

                new_rep.user_FIO = req.body.registrator_fio;
                new_rep.user_position = req.body.registrator_position;
                new_rep.user_telphone = req.body.registrator_email;
                new_rep.user_email = req.body.registrator_phone;


                //лого
                let writestream = gfs.createWriteStream({
                    filename: req.files['upload'][0].filename
                });
                fs.createReadStream(req.files['upload'][0].path)
                    .on('end', function () { fs.unlink(req.files['upload'][0].path, function (err) { console.log("success") }) })
                    .on('err', function () { console.log('Error uploading image') })
                    .pipe(writestream);
                writestream.on('close', function (file) {
                    //console.log(file.filename + ' Written To DB');
                });
                new_rep.preview = '/' + req.files['upload'][0].filename;


                //отчет ru
                    if(req.files['ru_PDF']!=undefined) {
                        writestream = gfs.createWriteStream({
                            filename: req.files['ru_PDF'][0].filename
                        });
                        fs.createReadStream(req.files['ru_PDF'][0].path)
                            .on('end', function () {
                                fs.unlink(req.files['ru_PDF'][0].path, function (err) {
                                    console.log("success")
                                })
                            })
                            .on('err', function () {
                                console.log('Error uploading pdf_ru')
                            })
                            .pipe(writestream);
                        writestream.on('close', function (file) {
                            console.log(file.filename + ' Written To DB');
                        });
                        new_rep.doc_rus = '/' + req.files['ru_PDF'][0].filename;
                    }

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
                        //console.log(file.filename + ' Written To DB');
                    });
                    new_rep.doc_en = '/' + req.files['en_PDF'][0].filename;
                }

                res.render('ok',{user: new_rep.user_FIO, object: 'отчета'});
                console.log(new_rep);
                result.reports.push(new_rep._id);
                new_rep.save();


                result.save().then(()=>{
                    console.log('компания сейванулась');
                },()=>{
                    console.log('компания не сейванулась');
                });



                });
            });
        }
        else
            console.log('Ошибка капчи');
    });
};


exports.getReportById = function (req, res){
    getStatic(function(result, parse){
        let stat = parse(result);
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

exports.validateReport = function (req, res) {
    if (req.session.user){
        Report.findOne({_id:req.params.report_id}).then(function (report){
            if (req.body.accept!=7){
                    report.accept = req.body.accept;
            }

            if (req.body.RRS_correct != undefined && req.body.RRS_correct!='')
                report.RRS = req.body.RRS_correct;

            if (req.body.RRSlink_correct != undefined && req.body.RRSlink_correct!='')
                report.RRSlink = req.body.RRSlink_correct;

            getStatic(function(resul, parse){
                let stat = parse(resul);
                let best = [];
                for(let i=0; i<stat.best.length; i++)
                    if (req.body[stat.best[i]] != undefined)
                        best.push(req.body[stat.best[i]]);
                if (best.length != 0)
                    report.Best = best;
                report.save();
                console.log(report.Best);
            });

            report.save();
        });
        res.redirect('/report/'+req.params.report_id);
    }
    else
    {
        res.send('У Вас нет прав для данной операции');
    }
};

