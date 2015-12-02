var app = angular.module('sensorCloudApp', ['userModule','ui.router', 'ngResource', 'ngMaterial', 'ngMessages','md.data.table']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
	};
});

app.config(function ($stateProvider, $urlRouterProvider,$locationProvider){

	$stateProvider

		.state('index',{
			url:'/index',
			views: {
				'' : { templateUrl: 'main.html',
					   controller: 'UserCtrl'},
				'toolbar': {
					templateUrl : '/views/toolbar.html',
					controller: 'ToolbarCtrl',
					controllerAs:'toolbar'				}
			}
		})
		.state('sensor-owner',{
			url:'/sensor-owner',
			views: {
					'': {
						templateUrl: 'sensor_owner_db.html'
						},
					'toolbar': {
						templateUrl : '/views/toolbar.html',
						controller: 'ToolbarCtrl',
						controllerAs:'toolbar'
						}
			}
		})

		.state('sensor-owner.profile',{
			url:'/profile',
			templateUrl: '/views/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'profile'
		})
		.state('sensor-owner.manage-sensor',{
			url:'/manage-sensors',
			templateUrl: '/views/onwer-manage-sensor.html',
			controller: 'ManageSensorCtrl'
		})
		.state('sensor-user',{
			url:'/sensor-user',
			views: {
				'': {
					templateUrl: 'sensor_user_db.html'
				},
				'toolbar': {
					templateUrl : '/views/toolbar.html',
					controller: 'ToolbarCtrl',
					controllerAs:'toolbar'
				}
			}
		})
		.state('sensor-user.profile',{
			url:'/profile',
			templateUrl: '/views/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'profile'
		})
		.state('sensor-user.availableSensor',{
				url:'/availableSensor',
				templateUrl: '/views/AvailableSensor.html',
				controller : 'AvailableSensorCtrl'
		})
		.state('sensor-user.mySensor',{
			url:'/mySensor',
			templateUrl: '/views/MySensor.html',
			controller : 'MySensorCtrl'
		})
		.state('login',{
			url:'/login',
			data:'login',
			views: {
				'': {
					templateUrl: '/views/login.html',
					controller: 'UserCtrl'
				},
				'toolbar': {
					templateUrl : '/views/toolbar.html',
					controller: 'ToolbarCtrl',
					controllerAs:'toolbar'

				}
			}
		})
		.state('forgot',{
			url:'/forgot',
			data: 'forgot',
			views: {
				'' : {
					templateUrl: '/views/forgot.html',
					controller: 'UserCtrl'
				},
				'toolbar': {
					templateUrl : 'views/toolbar.html',
					controller:'ToolbarCtrl',
					controllerAs:'toolbar'

				}
			}
		});
	$urlRouterProvider.when('', '/index');

});
app.config(['$mdIconProvider', function($mdIconProvider) {
	$mdIconProvider
		 // Register a specific icon (by name)
		.icon('add', 'images/svg/ic_add_white_36px.svg')
		.icon('profile','images/svg/ic_face_black_36px.svg')
		.icon('manage','images/svg/ic_settings_black_36px.svg');
}]);
app.config(function($mdThemingProvider){

	$mdThemingProvider.theme('default')
		.primaryPalette('indigo', {
			'default': '500',
			'hue-1': '50',
			'hue-2': '700',
			'hue-3' : '300'
		})
		.accentPalette('blue', {
			'default': 'A700' // use shade 200 for default, and keep all other shades the same
		})
		.backgroundPalette('grey');

	$mdThemingProvider.theme('custom')
		.primaryPalette('grey')
		.accentPalette('orange')
		.warnPalette('red');

});


app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('sensorOwnerController', function($scope, $http, $rootScope, $location){

});

app.controller('sensorUserController', function($scope, $http, $rootScope, $location){

});
