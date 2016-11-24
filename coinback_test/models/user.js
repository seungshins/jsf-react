/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	phoneNum : String,
	barcodeNum : String,
	balance : Number
});

module.exports = mongoose.model('User', userSchema); 