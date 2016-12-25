var mongoose = require('mongoose');


var staticSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId, 
    name : String,
    mass: [String]
});

//На самом деле проще было бы сделать через prototype
var getStatic = function (callback){
    staticModel.find({}, function (err, docs){}).then(function(result){
        function parse (result){
        var i;
        var stat = {};
        for(i=0; i<result.length; i++){
            switch(result[i].name){
                case 'standarts' : stat.standarts = result[i].mass;
                    break;
                case 'sector': stat.sector = result[i].mass;
                    break;
                case 'opf': stat.opf = result[i].mass;
                    break;
                case 'size_of_company': stat.size_of_company = result[i].mass;
                    break;
                case 'type_of_ownership': stat.type_of_ownership = result[i].mass;
                    break;
                case 'year': stat.year = result[i].mass;
                    break;
                case 'best': stat.best = result[i].mass;
                    break;
                case 'city': stat.city = result[i].mass;
                    break;
                }
            }
        return stat;
        }
        callback(result, parse);
    });
};

exports.standartsREST = function (req, res){
    staticModel.findOne({name: 'standarts'}).then(function(result){
        res.json(result.mass);
    })
}

exports.bestREST = function (req, res){
    staticModel.findOne({name: 'best'}).then(function(result){
        res.json(result.mass);
    })
}

var staticModel = mongoose.model('static', staticSchema);
module.exports.getStatic = getStatic;