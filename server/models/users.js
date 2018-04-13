var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require("bcrypt");

var User = new Schema({
    id:         ObjectId,
    name:       {type: String, unique: true},
    password:   String,
    level: {type: Number, default: 0},
    car: {type: String, default: "basic"}
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

exports.getUser = function(username, cb){
    userModel.findOne({name: username}, function(err, user){
        if(err){
            cb(err, null);
        } else {
            cb(null, user);
        }
    });
}

exports.validateUser = function(username, pass, cb){
    userModel.findOne({name: username}, function(err, user){
        if(!user){
            cb("password or username are wrong", null);
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


exports.updateLevel = function(user, level, cb){
    console.log("updating score of : "+ user + "to: " + level);
    userModel.findOneAndUpdate({name :user}, {"level": level}, function(err){
        if(err) cb(err);
        else{
            cb(null);
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


exports.addPoint = function(user, cb){

    userModel.findOneAndUpdate({name :user}, {$inc : {'level' : 1}}, function(err){
        if(err){
            console.log("err");
            cb(err)
        } else{
            cb(null)
        }
    })
}

exports.getScore = function(user, cb){

    userModel.findOne({name: user}, function(err, usr){
        if(err){
            cb(err, null)
        } else{
            cb(null, usr.level)
        }
    })
}

exports.buyCar = function(user, car, cb){
    userModel.findOne({name: user}, function(err, usr){
        if(err){
            cb(err)
        } else{
            var points = usr.level
            if(points > parseInt(car.cost)){
                userModel.findOneAndUpdate({name: user}, {car: car.model}, {upsert:true}, function(err, doc){
                    if (err) {cb(err)}
                    else {cb(null)}
                });
            } else{
                console.log("not enough points");
            }
        }
    })
}


module.exports.userSchema = userModel;