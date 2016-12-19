var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var babel_es6 = require('babel-core/register');
var es6 = require('./server')
var dbModel = require('./app/models/db-model');
var app = express();


app.use(bodyParser());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));
app.set('views', './app/views');
app.set('view engine', 'jade');


app.get('/', require('./app/controllers/main').mainPage);
app.get('/main', require('./app/controllers/main').mainPage);
app.get('/search', require('./app/controllers/search').searchReportPage);
app.get('/search-company', require('./app/controllers/search').searchCompanyPage);
app.get('/stats', require('./app/controllers/stats').statsPage);
app.get('/register-report', require('./app/controllers/report').registerReportPage);
app.get('/register-company', require('./app/controllers/company').registerCompanyPage);
app.get('/admin', require('./app/controllers/admin').adminPage);


app.get('/search/:sort', require('./app/controllers/search').searchReportPage);
app.get('/company/:name', require('./app/controllers/company').getCompanyByName);
app.get('/report/:id', require('./app/controllers/report').getReportById);
app.post('/company/create/', require('./app/controllers/company').addCompany);
app.post('/report/create/', require('./app/controllers/report').addReport);
app.get('/:filename', require('./app/controllers/db-files').getFile); 


//маршрутизация API запросов
app.get('/v1/search/company/:amount/:page/:sort/:sector/:size_of_company/:search',require('./app/controllers/search').searchCompanyPageREST);
app.get('/v1/stats/:sector/:standart/:size_of_company/:type_of_ownership', require('./app/controllers/stats').getStats);
//app.get('/v1/report/:id', rest.getReportById);
//app.get('/v1/company/:name', rest.getCompanyByName);
//app.get('/v1/search/companies/', rest.searchCompnaies);
//app.get('/v1/search/reports/', rest.searchReports);


app.listen(8080);
console.log('Server started!');
