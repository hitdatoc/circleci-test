var express = require('express');
var app = express();
var http = require('http').Server(app);
var favicon = require('serve-favicon');

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

app.use(favicon(__dirname + '/favicon.ico'));

http.listen(process.env.PORT || 8888);