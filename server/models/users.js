var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require("bcrypt");

var User = new Schema({
    id:         ObjectId,
    name:       {type: String, unique: true},
    password:   String,
});

var userModel =  mongoose.model("User", User, "users");

exports.createUser = function(username, pass, cb){
    bcrypt.hash(pass, 10, function(err, hash) {
        new userModel({
            name: username,
            password: hash
    }).save(function(err){
        if(err){
            cb(err);
        } else {
            cb(null);
        }
    });
    });
}

exports.validateUser = function(username, pass, cb){
    userModel.findOne({name: username}, function(err, user){
        if(!user){
            cb("password o username incorette", null);
        } else {
            console.log(pass);
            bcrypt.compare(pass, user.password, function(err, res) {
                if(err){
                    cb(err, null);
                } else{
                    cb(null, user);
                }
            });
        }
    });
}


exports.checkSession = function(username, cb){
    userModel.findOne({name: username}, function(err, user){
        if(!user){
            cb(err, null);
        } else {
            cb(null, user);
        }
    });
}


module.exports.userSchema = userModel;