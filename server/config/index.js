'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

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
	console.log(req.body);
	res.send(req.body.username);
})

app.use(express.static(path.join(__dirname, './../../dist/client')))


module.exports = app
