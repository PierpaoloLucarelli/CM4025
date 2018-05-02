var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require("bcrypt");

var User = new Schema({
    id:         ObjectId,
    name:       {type: String, unique: true},
    password:   String,
    level: {type: Number, default: 0},
    unlock: String,
    car: {type: String, default: "car1"}
});

var userModel =  mongoose.model("User", User, "users");


// create a new user
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


// unlock level 2
exports.setUnlock = function(username, cb){
    console.log("unlocking");
    userModel.findOneAndUpdate({name: username}, {unlock: "2"}, cb);
}


// get user details
exports.getUser = function(username, cb){
    userModel.findOne({name: username}, function(err, user){
        if(err){
            cb(err, null);
        } else {
            cb(null, user);
        }
    });
}


// validate user for log in
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


// update the users score
exports.updateLevel = function(user, level, cb){
    console.log("updating score of : "+ user + "to: " + level);
    userModel.findOneAndUpdate({name :user}, {"level": level}, function(err){
        if(err) cb(err);
        else{
            cb(null);
        }
    });
}


// check if sessione existst
exports.checkSession = function(username, cb){
    userModel.findOne({name: username}, function(err, user){
        if(!user){
            cb(err, null);
        } else {
            cb(null, user);
        }
    });
}


// add one point to the users score
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


// gets the users's score
exports.getScore = function(user, cb){

    userModel.findOne({name: user}, function(err, usr){
        if(err){
            cb(err, null)
        } else{
            cb(null, usr.level)
        }
    })
}


// adds a car to a user 
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
                cb("Not enough points")
            }
        }
    })
}


module.exports.userSchema = userModel;