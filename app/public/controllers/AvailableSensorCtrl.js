/**
 * Created by karanbir on 28/11/15.
 */
/**
 * Created by karanbir on 28/11/15.
 */
angular.module('sensorCloudApp')
    .controller('AvailableSensorCtrl', AvailableSensorCtrl);

function AvailableSensorCtrl($scope){
    $http.get('/sensor/availableSensors').success(function (data) {
        console.log(data);
        $scope.sensors = data;
    });

}
