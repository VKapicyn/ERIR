var mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('./userModel');
var dbModel = require('../models/db-model');
var db = dbModel.db;

 
// User API
 
exports.createUser = function(userData){
	var user = {
		username: userData.name,
		password: userData.password
	}
	return new User(user).save()
}
 
exports.getUser = function(id) {
	return User.findOne(id)
}
 
exports.checkUser = function(userData) {
	return User
		.findOne({username: userData.username})
		.then(function(doc){
            if(doc!=null){
                if ( doc.password == userData.password ){
                    console.log("User password is ok");
                    return Promise.resolve(doc)
                } else {
                    return Promise.reject("Error wrong")
                }
            }
            else
                return doc;
		})
}