var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var Static = require('../models/staticModel').staticModel;
var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;


exports.registerCompanyPage = function (req, res){  
    var sector;
    Static.findOne({name:'sector'},function(err, docs){
        if (err) return handleError(err);
        if (docs) {
            sector = docs.mass;      
            res.render('register-company', {sector:sector}); 
        }   
    });  
};

exports.addCompany = function (req,res){
    var new_comp = new Company;
    new_comp.name = req.body.name;

    //cохраняем лого в БД
    req.files.logo.mv('src/buffer/'+new_comp._id+req.files.logo.name, function (err) {});

    var writestream = gfs.createWriteStream({
      filename: new_comp._id+req.files.logo.name
    });

    fs.createReadStream('src/buffer/'+new_comp._id+req.files.logo.name)
      .on('end', function(){fs.unlink('src/buffer/'+new_comp._id+req.files.logo.name, function(err){console.log("success")})})
        .on('err', function(){ console.log('Error uploading image')})
          .pipe(writestream);
 
    writestream.on('close', function (file){
        console.log(file.filename + ' Written To DB');
    });

    //переделать в связи со схемой
    new_comp.logo = '/'+new_comp._id+req.files.logo.name;
    new_comp.info = req.body.info;
    new_comp.adress = req.body.adress; 
    new_comp.telephone = req.body.telephone;
    new_comp.CEO = req.body.CEO;
    new_comp.fax = req.body.fax; 
    new_comp.link = req.body.link;
    new_comp.consult = req.body.consult;
    new_comp.save();
    res.send('ok '+new_comp._id+' ');
};

exports.getCompanyByName = function (req, res) {
    Company.findOne({name:req.params.name}).then(function (company){
        Report.find({company:company.name}).then(function (reports){
        if (company.accept==1)
		    res.render('company', {company:company, reports:reports});
        else
            res.send('Компания не прошла проверку у администрации ресурса');
        });
	});
};