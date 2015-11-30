/**
 * Created by karanbir on 26/11/15.
 */
angular.module('sensorCloudApp')
    .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl($scope, User){

    $scope.viewMode = false;

    $scope.edit = function(){
        console.log('iam edit');
        $scope.viewMode = true;
    };

    $scope.save = function(){
        console.log('iam save');
        $scope.viewMode = false;
    };

    $scope.cancel = function(){
        console.log('iam cancel');
        $scope.viewMode = false;
    };


    console.log(User.getUser());
    this.user = User.getUser();

    console.log(User.isAuthenticated());

}