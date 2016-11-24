
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var morgan = require('morgan');
var user = require('./routes/user');
var history = require('./routes/history');

//CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
 
mongoose.connect('mongodb://localhost/test');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

var User = require('./models/user');
var History = require('./models/history');
var user = require('./routes/user')(app, User);
var history = require('./routes/history')(app, History);

app.get("/userHome", function(req, res){
	res.sendFile(__dirname + "/views/user/userHome.html");
});
app.get("/userHistory", function(req, res){
	res.sendFile(__dirname + "/views/user/userHistory.html");
});
app.get("/transfer", function(req, res){
	res.sendFile(__dirname + "/views/user/transfer.html");
});
app.get("/admin", function(req, res){
	res.redirect("/posHome");
});
app.get("/posHistory", function(req, res){
	res.sendFile(__dirname + "/views/pos/posHistory.html");
});
app.get("/posHome", function(req, res){
	res.sendFile(__dirname + "/views/pos/posHome.html");
});

app.get("/", function(req, res){
	res.redirect("/userHome");
	/*res.sendFile(__dirname + "/views/index.html");*/
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
