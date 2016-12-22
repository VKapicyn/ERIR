var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId; 
var dbModel = require('../models/db-model');
var db = dbModel.db;


import {upload, fs, gfs} from '../models/db-model';


var getStatic = require('../models/staticModel').getStatic;
var Company = require('../models/companyModel').companyModel;
var Report = require('../models/reportModel').reportModel;


exports.registerCompanyPage = function (req, res){  
    getStatic(function(result, parse){
        var stat = parse(result);
        res.render('register-company', {
            sector: stat.sector, 
            opf:stat.opf, 
            size_of_company: stat.size_of_company, 
            type_of_ownership: stat.type_of_ownership,
            city: stat.city
        });
    });
};

exports.addCompany = function (req,res){
    var new_comp = new Company;
    //new_comp.reports = {};
    new_comp.name = req.body.company_name;
    //console.log(new_comp.name);
    //console.log(req.body);
    new_comp.short_name = req.body.company_short_name;
    new_comp.info = req.body.company_description;
    new_comp.opf = req.body.organization_form;
    new_comp.user_telphone = req.body.registrator_phone;
    new_comp.sector = req.body.economy;
    new_comp.adress = req.body.company_law_address;
    new_comp.size_of_company = req.body.company_size;
    new_comp.type_of_ownership = req.body.ownership;
    new_comp.listing = req.body.listing;
    new_comp.CEO = req.body.CEO;
    new_comp.link = req.body.company_site;
    new_comp.user_email = req.body.registrator_email;
    new_comp.user_FIO = req.body.registrator_fio
    new_comp.user_position = req.body.registrator_position;
    new_comp.employees = req.body.employees;
    new_comp.revenue = req.body.revenue;
    new_comp.city = req.body.city;
    new_comp.comp_phone = req.body.comp_phone;
    new_comp.comp_fax = req.body.comp_fax;
    new_comp.comp_email = req.body.comp_email;

    new_comp.date = new Date();
    
    console.log(req.files);

     //cохраняем лого в БД
    req.files.upload_logo.mv('src/buffer/'+new_comp._id+req.files.upload_logo.name, function (err) {console.log('ttts '+err)});

    var writestream = gfs.createWriteStream({
      filename: new_comp._id+req.files.upload_logo.name
    });

    fs.createReadStream('src/buffer/'+new_comp._id+req.files.upload_logo.name)
      .on('end', function(){fs.unlink('src/buffer/'+new_comp._id+req.files.upload_logo.name, function(err){console.log('success')})})
        .on('err', function(){ console.log('Error uploading image')})
          .pipe(writestream);
 
    writestream.on('close', function (file){
        console.log(file.filename + ' Written To DB');
    });

    new_comp.logo = '/'+new_comp._id+req.files.upload_logo.name;
    new_comp.save();

    // добавить отправку писем

    res.redirect('/'); // Добавить страницу об успешной регистрации
};

exports.getCompanyById = function (req, res) {
    Company.findOne({_id:req.params.id}).then(function (company){
        Report.find({company_id: company._id}).then(function (reports){
		    res.render('company', {company:company, reports:reports, admin: req.session.user});
        });
	});
};
