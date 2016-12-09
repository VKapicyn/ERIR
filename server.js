var express = require('express');// берём Express
var control = require('./app/controllers/pages'); //Общий контроллер страниц
var api = require('./app/api'); //api для компаний и отчетов
var app = express(); // создаём Express-приложение
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');


app.use(fileUpload());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/src'));//подключаем статику(изображения, стили, клиентский js)
app.set('views', './app/views'); //указыываем папку с вьюшками
app.set('view engine', 'jade'); // 'view engine' - механизм визуализации данного шаблонизатора

// маршруты страниц
app.get('/', control.GeneralPage); // главная
app.get('/main', control.GeneralPage); // главная (по ТЗ)
app.get('/search', api.Search); // поиск
app.get('/stats', control.StatsPage); // страница статистики
app.get('/register', control.RegistrPage); // страница добавления отчета
app.get('/admin', control.AdminPage); // админка
app.get('/report/:id', api.getReportById);
app.get('/company/:id', api.getCompanyById);
app.post('/company/create/', api.addCompany); // создаем компанию
app.post('/report/create/', api.addReport); // создаем отчет

//маршрутизация API запросов
//app.post('/v1/report/:id', api.getReportById); // выводим отчет по id
//app.post('/v1/company/:id', api.getCompanyById); // выводим компанию по id
app.get('/v1/search/companies/', api.searchCompnaies); // поиск по компаниям
app.get('/v1/search/reports/', api.searchReports); // поиск по отчетам


//лишнее
app.get('/sector/:name', api.getSectorByName); //ищем отрасль по имени
app.get('/companies/sector/:name',api.getCompaniesBySectorName);//ищем компании по названию отрасли 

app.get('/:filename', api.getFile);//возвращаем файл из БД

// запускаем сервер на порту 8080
app.listen(8080);
console.log('Server started!');
