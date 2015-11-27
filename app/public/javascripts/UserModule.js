/**
 * Created by karanbir on 26/11/15.
 */
angular.module('userModule',[])

    .config([function(){
        console.log("User Module : config");
    }])
    .run([function(){
        console.log("User Module : running");
    }])
    .factory('User', function(){

        var user = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            phoneNumber : '',
            gender : ''
        };

        var rePassword = '';
        var Authenticated = false;
        return {

            getUser: function(){
                return user;
            },
            setUser: function(newUser){
                user = newUser;
            },
            getRePassword: function(){
                return rePassword;
            },
            isAuthenticated: function(){
                return Authenticated;
            },
            setAuthenticated : function(value){
                Authenticated = value;
            }
        };


    })
    .directive('confirmPwd', function($interpolate, $parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, ngModelCtrl) {

                var pwdToMatch = $parse(attr.confirmPwd);
                var pwdFn = $interpolate(attr.confirmPwd)(scope);

                scope.$watch(pwdFn, function(newVal) {
                    ngModelCtrl.$setValidity('password', ngModelCtrl.$viewValue == newVal);
                });

                ngModelCtrl.$validators.password = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return value == pwdToMatch(scope);
                };

            }
        }
    })
    .controller('UserCtrl', function($scope,User,$state,$http,$mdToast){
        $scope.user = User.getUser();
        $scope.rePassword = User.getRePassword();

        $scope.login = function() {
            console.log("I am running");
            console.log($scope.user);
            $http.post('/auth/login', $scope.user).success(function (data) {
                if(data.state == 'success') {
                    User.setUser(data.user);
                   console.log(data.user);
                    $state.go('sensor-owner');
                    User.setAuthenticated(true);
                    console.log(User.isAuthenticated());
                }
                else {
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                    User.setAuthenticated(false);
                }
            });
        };

        $scope.register = function() {
            $http.post('/auth/register', $scope.user).success(function (data) {
                if(data.state == 'success') {
                    console.log(data.message);
                    $location.path('/login');
                }else{
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                }
            })
        };


    });
