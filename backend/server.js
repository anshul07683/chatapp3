var http = require('http');
var express = require('express');
var router = express.Router();
var mongo = require ('mongodb');
var assert = require ('assert');
var bodyParser = require("body-parser");
var app = require('./app')


const server = http.createServer();

app.listen(3003, function(){
  console.log('server is running on port no 3003');
})
