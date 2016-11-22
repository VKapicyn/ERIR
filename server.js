var express = require('express');// берём Express
var control = require('./app/controllers/pages'); //Общий контроллер страниц
var api = require('./app/api'); //api для компаний и отчетов
var app = express(); // создаём Express-приложение

app.use(express.static(__dirname + '/src'));//подключаем статику(изображения, стили, клиентский js)
app.set('views', './app/views'); //указыываем папку с вьюшками
app.set('view engine', 'jade'); // 'view engine' - механизм визуализации данного шаблонизатора

// маршруты страниц
app.get('/', control.GeneralPage); // главная
app.get('/main', control.GeneralPage); // главная (по ТЗ)
app.get('/search', control.SearchPage); // поиск
app.get('/stats', control.StatsPage); // страница статистики
app.get('/register', control.RegistrPage); // страница добавления отчета
app.get('/admin', control.AdminPage); // админка

//маршрутизация API запросов
app.get('/report/:id', api.getReportById); // выводим отчет по id
app.get('/company/:id', api.getCompanyById); // выводим компанию по id
app.get('/company/create/:id', api.addCompany); //создаем компанию по id HALT! передалать
app.get('/sector/:name', api.getSectorByName); //ищем отрасль по имени

// запускаем сервер на порту 8080
app.listen(8080);
console.log('Server started!');