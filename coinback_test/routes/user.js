
/*
 * GET users listing.
 */
module.exports = function(app, User){
	app.get("/api/getUser/:barcodeNum", function(req, res, err){
		User.findOne({'barcodeNum':req.params.barcodeNum}, function(err, user){
			if(err){
				console.err(err);
				throw err;
			}
			console.log("---- get Users ----");
			console.log(user);
			console.log("----     end   ----");
			res.json(user);
		});
	});

	app.post("/api/user", function(req, res){
		User.create({
			phoneNum : req.body.phoneNum,
			barcodeNum : req.body.barcodeNum,
			balance : req.body.balance,
			done : false
		}, function(err, user){
			if(err)
				res.send(err);
			
			User.find(function(err, users){
				if(err)
					res.send(err);
				res.json(users);
			});
		});
	});
	
	app.put("/api/updateUser/:barcodeNum", function(req, res){
		User.update({barcodeNum:req.params.barcodeNum},{$set: req.body}, function(err, output){
			if(err) {
				return res.status(500).send({error: 'database error'});
			}
			console.log(output);
			if(!output.n) {
				return res.status(404).send({error: 'user not found'});
			}
			res.json({message:"user updated"});
		});
	});
};
