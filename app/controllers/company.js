let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId; 
let dbModel = require('../models/db-model');
let db = dbModel.db;


import {fs, gfs} from '../models/db-model';


let getStatic = require('../models/staticModel').getStatic;
let Company = require('../models/companyModel').companyModel;
let Report = require('../models/reportModel').reportModel;
let recaptcha = require('../models/recaptchaModel').recaptcha;


exports.registerCompanyPage = function (req, res){  
    getStatic(function(result, parse){
        let stat = parse(result);
        res.render('register-company', {
            sector: stat.sector, 
            opf:stat.opf, 
            size_of_company: stat.size_of_company, 
            type_of_ownership: stat.type_of_ownership,
            city: stat.city,
        });
    });
};

exports.addCompany = function (req,res){
    recaptcha.verify(req, function(error){
        if(!error){
            let new_comp = new Company;
            new_comp.name = req.body.company_name;
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
            new_comp.user_FIO = req.body.registrator_fio;
            new_comp.user_position = req.body.registrator_position;
            new_comp.employees = req.body.employees;
            new_comp.revenue = req.body.revenue;
            new_comp.city = req.body.city;
            new_comp.comp_phone = req.body.comp_phone;
            new_comp.comp_fax = req.body.comp_fax;
            new_comp.comp_email = req.body.comp_email;
            new_comp.accept = '0';

            new_comp.date = new Date();

            let writestream = gfs.createWriteStream({
            filename: req.file.filename
            });

            fs.createReadStream(req.file.path)
            .on('end', function(){fs.unlink(req.file.path, function(err){console.log('success')})})
                .on('err', function(){ console.log('Error uploading image')})
                .pipe(writestream);
        
            writestream.on('close', function (file){
                console.log(file.filename + ' Written To DB');
            });

            new_comp.logo = '/'+req.file.filename;
            new_comp.save();

            // добавить отправку писем
            res.render('ok',{user: new_comp.user_FIO, object: 'компании'});
        }
        else
            console.log('Ошибка капчи');
    });
    //res.redirect('/'); // Добавить страницу об успешной регистрации
};

exports.getCompanyById = function (req, res) {
    Company.findOne({_id:req.params.id}).then(function (company){
        Report.find({company_id: company._id}).then(function (reports){
            console.log(reports);
		    res.render('company', {
                company:company, 
                reports:reports, 
                admin: req.session.user
            });
        });
	});
};

exports.validateCompany = function (req, res) {
    if (req.session.user){
        if (req.body.accept!==7){
            Company.findOne({_id:req.params.company_id}).then(function (company){
                company.accept = req.body.accept;
                company.save();
            });
        }
        res.redirect('/company/'+req.params.company_id);
    }
    else
    {
        res.send('У Вас нет прав для данной операции');
    }
};
