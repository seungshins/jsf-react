/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
	orgName : String,
	barcodeNum : String,
	amount : Number,
	useYn : { type : String, 'default': 'Y' },
	payDt : { type : Date, 'default': Date.now }
}); 

module.exports = mongoose.model('History', historySchema);