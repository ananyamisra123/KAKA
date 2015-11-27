/**
 * Created by karanbir on 26/11/15.
 */
angular.module('sensorCloudApp')
    .controller('ToolbarCtrl', ToolbarCtrl);

function ToolbarCtrl($scope, User){
        this.isAuthenticated =  false;

        if(User.isAuthenticated()){
            this.isAuthenticated = true;
            this.user = User.getUser()
        }

}