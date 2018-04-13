var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var bcrypt = require("bcrypt");

var Car = new Schema({
    id:         ObjectId,
    model:       {type: String, unique: true},
    speed: Number,
    cost: {type: Number, default: 0}
});

var carModel =  mongoose.model("Car", Car, "cars");

exports.addCar = function(car, cb){
    new carModel({
            model: car.model,
            speed: car.speed,
            cost: car.cost
    }).save(function(err){
        if(err){
            cb(err);
        } else {
            cb(null);
        }
    });
}

exports.getAll = function(cb){
    carModel.find({}, function(err, cars) {
        if(err){
            cb(err, null);
        } else{
            cb(null, cars);
        }
    });
}

module.exports.carSchema = carModel;