/**
 * Created by karanbir on 28/11/15.
 */
angular.module('sensorCloudApp')
    .controller('ManageSensorCtrl', ManageSensorCtrl);

function ManageSensorCtrl($scope,$mdDialog,$mdToast,$http){

    $scope.sensors = [
        { sensorName: 'Home', sensorType: '(555) 251-1234', sensorSerialNo: '5354-3454' },
        { sensorName: 'Cell', sensorType: '(555) 786-9841', sensorSerialNo: '5354-3454' },
        { sensorName: 'Office', sensorType: '(555) 314-1592', sensorSerialNo: '5354-3454' }
    ];
    $scope.showDialog = function(ev) {
        $mdDialog.show({
            controller: DialogCtrl,
            templateUrl: 'views/add_sensor_dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    function DialogCtrl($scope, $mdDialog) {

        $scope.sensor = {
            sensorName : '',
            sensorType : '',
            serialNo : ''
        };

        $scope.addSensor = function(){

            $http.post('/sensor/register', $scope.sensor).success(function (data) {
                if(data.state == 'success') {
                    $mdToast.show($mdToast.simple().content(data.message));
                }else {
                    $scope.error_message = data.message;
                    $mdToast.show($mdToast.simple().content($scope.error_message));
                    console.log($scope.error_message);
                }
            });
            $mdDialog.hide();
        }
    }
}
