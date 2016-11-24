/**
 * http://usejsdoc.org/
 */
module.exports = function(app, History){
	app.get("/api/getHistory", function(req, res){
		History.find(function(err, historyList){
			if(err) {
				return res.status(500).send({error: 'database error'});
			}
			res.json(historyList);
		});
	});

	app.post("/api/createHistory", function(req, res){
		console.log(req.body);
		
		History.create( { 
			orgName : req.body.orgName,
			barcodeNum : req.body.barcodeNum,
			amount : req.body.amount,
			useYn : req.body.useYn
			}, function(err, history){
				if(err) 
					return res.status(500).send({error: 'database error'});
			    res.json(history);
		});
	});
	
	app.get("/api/getHistory/:barcodeNum", function(req, res){
		History.find({'barcodeNum':req.params.barcodeNum},function(err, historyList){
			if(err) {
				return res.status(500).send({error: 'database error'});
			}
			res.json(historyList);
		});
	});
	
	app.get("/api/searchHistory/:searchForm", function(req, res){
		console.log(req.params.searchForm);
		History.find({
			barcodeNum: new RegExp('^'+req.params.searchForm.barcodeNum+'$', 'i'),
			orgName:  new RegExp('^'+req.params.searchForm.orgName+'$', 'i'),
			payDt: { "$gte": req.params.searchForm.startDate, "$lte": req.params.searchForm.endDate }
		},function(err, historyList){
			if(err) {
				return res.status(500).send({error: 'database error'});
			}
			res.json(historyList);
		});
	});
};
