/**
 * http://usejsdoc.org/
 */
var coinback = angular.module('coinback', [])
				.controller("userHome", function ($scope, $http){
	
	$scope.formData = {};
	var barcodeNum = "111";
	$http.get('/api/getUser/'+barcodeNum)
		.success(function(data){
			$scope.user = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error. ' + data);
		});
})
.controller('transfer', function($scope, $http){
	
	var barcodeNum = 111;
	var getUser = {};
	$http.get('/api/getUser/'+barcodeNum)
		.success(function(data){
			$scope.user = data;
			getUser = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error. ' + data);
		});
	
	$scope.transfer = function(){
		$scope.formData.balance = getUser.balance - $scope.formData.amount;
		
		console.log($scope.formData);
		
		$http.put("/api/updateUser/"+barcodeNum, $scope.formData)
			.success(function(data){
				var historyData = {
						orgName : 'Transfer to My Account',
						barcodeNum : getUser.barcodeNum,
						useYn : 'N',
						amount : Number($scope.formData.amount) * (-1)
				};
				
				$http.post("/api/createHistory", historyData )
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
				console.log('Error: ' + data);
			});
	};
})
.controller('userHistory', function($scope, $http){
	$scope.formData = {};
	var barcodeNum = 111;
	
	$scope.checkUseYn = function(useYn){
		if(useYn == 'Y')
			return "text-primary";
		else{
			return "text-danger";
		}
		
	}
	
	$http.get('/api/getHistory/'+barcodeNum)
	.success(function(data){
		$scope.historys = data;
	})
	.error(function(data){
		console.log('Error. ' + data);
	});
	
}).controller('home', function($scope, $http){
	$scope.createUser = function() {
		$http.post('/api/user', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
});


