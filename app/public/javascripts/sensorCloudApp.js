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

			.when('/sensor-user',{

				templateUrl:'sensor_user_db.html',
				controller: 'sensorUserController'
			})

			.when('/', {

			templateUrl: 'main.html',
			controller: 'authController'

			})

			.when('/sensor-owner',{
				templateUrl:'sensor_owner_db.html',
				controller: 'sensorOwnerController'
			})
});


app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = { email: '',
		            password: '',
		            firstName: '',
		            lastName: '',
					address: '',
					address2: '',
					city: '',
					state: '',
					userType: ''
	};

	$scope.error_message = '';
	$scope.rePassword = '';
	$scope.login = function(){

			$http.post('/auth/login', $scope.user).success(function(data){

				if(data.state == 'success'){

					$rootScope.authenticated = true;
					$rootScope.current_user = data.user.firstName;
					$location.path('/sensor-user');



				}
				else{
					$scope.error_message = data.message;
				}
			});


	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.firstName;

				$location.path('/sensor-user');

			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});

app.controller('sensorOwnerController', function($scope, $http, $rootScope, $location){

});

app.controller('sensorUserController', function($scope, $http, $rootScope, $location){

});