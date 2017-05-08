var express = require('express');
var app = express();
var http = require('http').Server(app);

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});