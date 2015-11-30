/**
 * Created by karanbir on 28/11/15.
 */
/**
 * Created by karanbir on 28/11/15.
 */
angular.module('sensorCloudApp')
    .controller('AvailableSensorCtrl', AvailableSensorCtrl);

function AvailableSensorCtrl($scope){

    $scope.sensors = [
        { sensorName: 'Home', sensorType: '(555) 251-1234', sensorSerialNo: '5354-3454' },
        { sensorName: 'Cell', sensorType: '(555) 786-9841', sensorSerialNo: '5354-3454' },
        { sensorName: 'Office', sensorType: '(555) 314-1592', sensorSerialNo: '5354-3454' }
    ];

}
