'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
var userSchema = require("../models/users.js");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mmorpg');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

module.exports = app
