'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
var userSchema = require("../models/users.js");
var carSchema = require("../models/car.js");

var mongoose = require('mongoose');
mongoose.connect('mongodb://cm4025:cm4025@ds147469.mlab.com:47469/cm4025');
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, './../../dist/client'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/vendor', express.static(path.join(__dirname, './../../vendor')))
app.use('/assets', express.static(path.join(__dirname, './../../client/assets')))

// main game
app.get("/game", function(req,res){
	res.sendFile(path.join(__dirname, './../../dist/client/index.html'))
})

// welcome page
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

// get used details by username
app.get('/user/:user', function(req,res){
    userSchema.getUser(req.params.user, function(err, user){
        if(err){
            res.send("user not found");
        } else{
            res.send(user);
        }
    })
});

// get the cars in the market and show the market page to the user
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

// buy a car form the market by username and carname 
app.post("/market", function(req,res){
    var user =  parseCookies(req).username
    if(user != ""){
        var car = req.body
        var points = req.body.points;
        userSchema.buyCar(user, car, function(err){
            if(err){
                res.send("You don't have enough points to buy this car");
                console.log(err)
            } else{
                if(parseInt(points) >= parseInt(car.cost)){
                    userSchema.updateLevel(user, parseInt(points) - parseInt(car.cost), function(err){
                        if(err){
                            console.log("lol");
                            res.send("something went wrong");
                        } else{
                            console.log("user bought a car");
                            res.send("you have bought the car");
                        }
                    });
                } else{
                    res.send("not enough points to buy car");
                    console.log("not enough points to buy car");
                }

            }
        })
    }
});

app.use(express.static(path.join(__dirname, './../../dist/client')))

// register a user account
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

// helper function to transform cookies into json obect
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
