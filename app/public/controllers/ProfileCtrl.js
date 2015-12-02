/**
 * Created by karanbir on 26/11/15.
 */
angular.module('sensorCloudApp')
    .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($scope,$http, User){
    this.user = User.getUser();

    $scope.viewMode = false;
    $scope.edit = function(){
        console.log('iam edit');
        $scope.viewMode = true;
    };

    $scope.save = function(){
        console.log("I am save");
        $http.put("/auth/update",this.user).success(function(data){
            console.log(data);
        });
        $scope.viewMode = false;
    };

    $scope.cancel = function(){
        console.log('iam cancel');
        $scope.viewMode = false;
    };




}