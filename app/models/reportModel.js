var mongoose = require('mongoose');

//Схема данных отчета. 
//Доделать!!!
var ReportSchema = new mongoose.Schema({
    //уникальный идентификатор
    id : mongoose.Schema.Types.ObjectId,
    //0 - не проверен, 1 - одобрен, 2 - откланен
    visible: Number,
    //время добавления
    date: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.Schema.Types.Date.now
    },
    name : String, 
    year : Number, 
    preview : String,//string converted in Base64 
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    }, 
    interactive : String, 
    doc_rus : String,//? 
    doc_en : String,//? 
    about : String, 
    consultant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    }, 
    auditor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    }, 
    designer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    }, 
    manager : String 
    
},{
    collection: 'sector' //как выяснилось, это обязательно
});

//метод для отладки(проверка на id)
ReportSchema.methods.speak = function () {
    var test = this.id
        ? "My id is " + this.id
        : "I don't have id"
    console.log(test);
}

var ReportModel = mongoose.model('report', ReportSchema);
module.exports = ReportModel;
