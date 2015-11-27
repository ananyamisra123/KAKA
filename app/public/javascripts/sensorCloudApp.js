var app = angular.module('sensorCloudApp', ['userModule','ui.router', 'ngResource', 'ngMaterial', 'ngMessages']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
	};
});

app.config(function ($stateProvider, $urlRouterProvider){
	$stateProvider

		.state('index',{
			url:'/index',
			views: {
				'' : { templateUrl: 'main.html',
					   controller: 'UserCtrl'},
				'toolbar': {
					templateUrl : '/partials/toolbar.html',
					controller: 'ToolbarCtrl as toolbar'
				}
			}
		})
		.state('sensor-owner',{
			url:'/sensor-owner',
			views: {
					'': {
						templateUrl: 'sensor_owner_db.html'
						},
					'toolbar': {
						templateUrl : '/partials/toolbar.html',
						controller: 'ToolbarCtrl as toolbar'
						}
			}
		})
		.state('sensor-owner.profile',{
			url:'/profile',
			templateUrl: '/partials/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'profile'
		})
		.state('sensor-owner.manage-sensor',{
			url:'/manage-sensors',
			templateUrl: '/partials/onwer-manage-sensor.html'
		});

	$urlRouterProvider.when('', '/index');
});

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
		.primaryPalette('blue')
		.accentPalette('orange')
		.warnPalette('red');

});
app.config(['$mdIconProvider', function($mdIconProvider) {
	$mdIconProvider
		.iconSet('social', 'img/icons/sets/social-icons.svg', 24)
		.defaultIconSet('img/icons/sets/core-icons.svg', 24);
}]);

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('sensorOwnerController', function($scope, $http, $rootScope, $location){

});

app.controller('sensorUserController', function($scope, $http, $rootScope, $location){

});
