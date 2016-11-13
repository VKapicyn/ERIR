var mongoose = require('mongoose');

//Схема данных отчета. 
//Доделать!!!
var ReportSchema = new mongoose.Schema({
    //уникальный идентификатор
    id : { 
        type: Number
    },
    //0 - не проверен, 1 - одобрен, 2 - откланен
    visible: {
    	type: Number	
    },
    //время добавления
    dataCreated : {
        type: Date
    }
    /*

    Дописать код

    */
});

//метод для отладки(проверка на id)
ReportSchema.methods.speak = function () {
    var test = this.id
        ? "My id is " + this.id
        : "I don't have id"
    console.log(test);
}

var ReportModel = mongoose.model('report', ReportSchema);
exports = ReportModel;
