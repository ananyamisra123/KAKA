angular.module('sensorCloudApp')
    .service('userService', ['$http', function ($http) {

        var urlBase = '/auth/';

        this.login = function(user){
          return $http.post(urlBase + 'login',user);
        };
        this.register = function(user){
            return $http.post(urlBase + 'register', user);
        };

    }]);