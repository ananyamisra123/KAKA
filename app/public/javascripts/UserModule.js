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
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            address: '',
            address2: '',
            city: '',
            state: '',
            userType: '',
            phoneNumber: ''

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

        $scope.register = function() {
            $http.post('/auth/register', $scope.user).success(function (data) {
                if(data.state == 'success') {
                    $state.go('^.login');
                    $mdToast.show($mdToast.simple().content(data.message));
                    console.log(data.message);
                }else{
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                }
            })
        };
        $scope.login = function() {
            $http.post('/auth/login', $scope.user).success(function (data) {
                if(data.state == 'success') {
                    User.setUser(data.user);
                    console.log(data.user);
                    User.setAuthenticated(true);
                    if(data.user.userType == 'user'){
                        $state.go('sensor-user');
                    }else{
                        $state.go('sensor-owner');
                    }
                }else {
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                    $scope.user = User.getUser();
                    $state.go('login');
                    User.setAuthenticated(false);
                }
            });
        };

        $scope.forgotPassword = function(){

            $http.post('/api/forgot',{'email': $scope.user.email}).success(function (data) {
                if(data.state == 'success') {
                    $state.go('^');
                    $mdToast.show($mdToast.simple().content(data.message));
                }else {
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                }
            });
        };
        $scope.logout = function(){
            var user = {
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                address: '',
                address2: '',
                city: '',
                state: '',
                userType: '',
                phoneNumber: ''

            };
            $http.get('/auth/signout');
            User.setAuthenticated(false);
            User.setUser(user);
            $state.go('index');

        };



    });
