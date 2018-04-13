'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
var userSchema = require("../models/users.js");
var carSchema = require("../models/car.js");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mmorpg');
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './../../dist/client'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/vendor', express.static(path.join(__dirname, './../../vendor')))
app.use('/assets', express.static(path.join(__dirname, './../../client/assets')))

app.get("/game", function(req,res){
	res.sendFile(path.join(__dirname, './../../dist/client/index.html'))
})

app.get("/", function(req,res){
	res.sendFile(path.join(__dirname, './../../dist/client/welcome.html'))
})

app.post("/", function(req,res){
	var username = req.body.username;
    var pass = req.body.pass;
    console.log(req.body);
    userSchema.validateUser(username, pass, function(err, user){
        if(err){
            res.send("wrong credentials");
        } else {
            // req.session.user = user;
            res.redirect("/game")
        }
    });
})

app.get("/market", function(req, res){
    var user =  parseCookies(req).username
    if(user != ""){
        userSchema.getScore(user,  function(err, score){
            if(err){
                console.log(err);
            } else{
                carSchema.getAll(function(err, cars){
                    if(err){
                        console.log(err);
                        res.send("somethign went wrong");
                    } else{
                        res.render('market.pug', {user: user, points: score, cars: cars })
                    }
                });
            }
        })
    }
})

app.post("/market", function(req,res){

    // console.log(req.body);
    // carSchema.addCar(req.body, function(err){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log("ok");
    //     }
    // })
    var user =  parseCookies(req).username
    if(user != ""){
        var car = req.body
        userSchema.buyCar(user, car, function(err){
            if(err){
                console.log(err)
            } else{
                if(user.level >= car.cost){
                    userSchema.updateLevel(user.name, user.level - parseInt(car.cost), function(err){
                        if(err){
                            res.send("something went wrong");
                        } else{
                            res.send("you have bought the car");
                        }
                    });
                }
            }
        })
    }
});

app.use(express.static(path.join(__dirname, './../../dist/client')))

app.post("/register", function(req,res){
	var username = req.body.username;
	var pass = req.body.pass;
	userSchema.createUser(username, pass, function(err){
        if(err){
            res.render("error.jade", {error: err});
        } else {
            res.redirect("/");
        }
    });
})

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

module.exports = app
