var express = require('express');
var app = express();
var http = require('http').Server(app);
var favicon = require('serve-favicon');
var firebase = require('firebase');


//---------------------------------
//Firebase Integration
//---------------------------------

// Initialize Firebase configuration
var config = {
	apiKey: "AIzaSyDyL0ESGLl7r9LTLNymLN9xSV9tYBBXlkA",
	authDomain: "fir-demo-project-a02bd.firebaseapp.com",
	databaseURL: "https://fir-demo-project-a02bd.firebaseio.com",
	projectId: "fir-demo-project-a02bd",
	storageBucket: "fir-demo-project-a02bd.appspot.com",
	messagingSenderId: "257491932042"
};
firebase.initializeApp(config);

// Initialize Firebase database service
var database = firebase.database();

//Test Firebase write function (.set)
firebase.database().ref('testdata/' + 'testdata1234').set({
	username: 'nametest1234',
	email: 'emailtest1234'
});

//Test Firebase listen functions (.on : listens for every change)
var test_username = firebase.database().ref('testdata/' + 'testdata1234' + '/username');
test_username.on('value', function(snapshot) {
	console.log('Firebase listen: testdata/' + 'testdata1234' + '/username' + ' : ' + snapshot.val());
});

firebase.database().ref('testdata/' + 'testdata1234').set({
	username: 'nametest123456',
	email: 'emailtest1234'
});

//Test Firebase listen functions (.once : single read)
var test_email = firebase.database().ref('testdata/' + 'testdata1234' + '/email');
test_email.once('value').then( function(snapshot){
	console.log('Firebase listen: testdata/' + 'testdata1234' + '/email' + ' : ' + snapshot.val());
});

firebase.database().ref('testdata/' + 'testdata1234').set({
	username: 'nametest12345678',
	email: 'emailtest123456'
});

//Test Firebase push function (.push : generate key)
var newPostKey = firebase.database().ref().child('testdata').push().key;
console.log(newPostKey);

//Test Firebase update function (.update : update specified item reference)
var updates = {};
updates['testdata/' + 'testdata1234'] = {
	username: 'nametest1234',
	email: 'emailtest1234'
};

var update_result = firebase.database().ref().update(updates); //Update: Returns promise from Firebase

//Test Firebase delete function (.remove : deletes specified item reference)
firebase.database().ref('testdata/' + 'testdata1234').remove();

//Test Firebase connected status check
var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
});


//---------------------------------
//Express Server
//---------------------------------

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

app.use(favicon(__dirname + '/favicon.ico'));

app.get('/favicon.ico', function(request, response){
	response.sendFile(__dirname + '/favicon.ico');
});

http.listen(process.env.PORT || 8888);


