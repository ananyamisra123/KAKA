/**
 * Created by karanbir on 26/11/15.
 */
angular.module('sensorCloudApp')
    .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($scope, User){

    $scope.viewMode = false;

    $scope.edit = function(){
        $scope.viewMode = true;
    };
    console.log(User.getUser());
    $scope.user = User.getUser();

    console.log(User.isAuthenticated());

}