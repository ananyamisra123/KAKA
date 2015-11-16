var app = angular.module('sensorCloudApp', ['ngRoute', 'ngResource', 'ngMaterial']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
	};
});

app.config(function($routeProvider){

	$routeProvider


		.when('/', {

			templateUrl: 'main.html',
			controller: 'authController'

		})

});


app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = { username: '',
		            password: '',
		            firstName: '',
		            lastName: '',
					email: '',
					address: '',
					address2: '',
					city: '',
					state: '',
					userType: ''
	};

	$scope.error_message = '';
	$scope.rePassword = '';
	$scope.login = function(){

		if($scope.user.password == $scope.rePassword)
		{
			$http.post('/auth/login', $scope.user).success(function(data){

				if(data.state == 'success'){

					$rootScope.authenticated = true;
					$rootScope.current_user = data.user.username;
					$location.path('/');
				}
				else{
					$scope.error_message = data.message;
				}
			});
		}else{
			$scope.error_message = "Passwords don't match";
		}

	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});