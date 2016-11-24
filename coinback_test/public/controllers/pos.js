/**
 * http://usejsdoc.org/
 */
var coinback = angular.module('coinback', [])
				.controller("posController", function ($scope, $http){
	
	$scope.formData = {};
	
	$scope.updateUser = function(barcodeNum){
		
		
		//find User for Updates
		$http.get("/api/getUser/"+barcodeNum)
			.success(function(data){
				console.log(data);
				
				
				//Update user balance 
				$http.put("/api/updateUser/"+barcodeNum, { barcodeNum : $scope.formData.bacodeNum, balance : data.balance+($scope.formData.getMoney-$scope.formData.payAmount) })
				.success(function(data){
					$scope.barcodeNum = barcodeNum;
					console.log("Success");
					console.log(data);
				})
				.error(function(data){
					console.log('Error : ');
					console.log(data);
				});
				
				//set OrgName and amount
				$scope.formData.orgName = 'GS25';
				$scope.formData.amount =  $scope.formData.getMoney - $scope.formData.payAmount;
				
				
				/*console.log("formData");
				console.log($scope.formData);*/
				
				//create History
				$http.post("/api/createHistory", $scope.formData )
					.success(function(data){
						console.log("Success");
						console.log(data);
					})
					.error(function(data){
						console.log('Error : ');
						console.log(data);
					});
			})
			.error(function(data){
				console.log('Error : ');
				console.log(data);
			});
	};
	
})
.controller("posHistory", function($scope, $http){
	$scope.formData = {};
	
	$scope.checkUseYn = function(useYn){
		if(useYn == 'Y')
			return "text-primary";
		else{
			return "text-danger";
		}
		
	}
	
	$http.get('/api/getHistory')
	.success(function(data){
		$scope.historys = data;
		console.log(data);
	})
	.error(function(data){
		console.log('Error. ' + data);
	});
	
})
;


