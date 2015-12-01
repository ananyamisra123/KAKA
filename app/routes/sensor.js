/**
 * Created by karanbir on 30/11/15.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sensor = mongoose.model('Sensor');
var SensorData = mongoose.model('SensorData');

router.route('/register')

    .post(function(req,res){

        Sensor.findOne({ 'serialNo' : req.body.serialNo}, function (err, sensor){

            if(err) console.log(err);

            if(sensor){
                return res.send({'status': 'failure', message: 'Sensor Already Exists'});
            }

            var newSensor = new Sensor();

            newSensor.userId = req.user.id;
            newSensor.sensorName = req.body.sensorName;
            newSensor.sensorType = req.body.sensorType;
            newSensor.serialNo = req.body.serialNo;

            newSensor.save(function(err) {
                if(err) console.log(err);

                return res.send({'status' : 'success', message: 'Sensor Successfully Registered'});
            });



        });
    });

router.route('/activate')

    .post(function(req,res){
        Sensor.findOne({ 'serialNo' : req.body.serialNo},function(err, sensor){

            if(err) console.log(err);

            if(!sensor){
                return res.send({'status': 'failure', message: 'No Sensor Registered with this serial name'});
            }
            sensor.activated = true;
            sensor.save(function(err){
               if(err) console.log("Unable to save" +err);
                res.send({'status': 'success', 'sensorId' : sensor._id , 'serialNo' : sensor.serialNo});
            });

        }) ;
    });
router.route('/getSensors')
    .get(function(req,res){
        Sensor.find({ 'userId' : req.user.id}, function (err, sensors){

            if(err) console.log(err);

            if(!sensors){
                return res.send({'status': 'failure', message: 'No Sensors Available'});
            }
            console.log('sensors data returned' + [sensors]);
            res.json(sensors);
               // return res.send({'status' : 'success', 'data' : [sensors]});

        });
    });

router.routes('/availableSensors')

    .get(function(req,res){
        Sensor.find({'activated': true}, function(err, sensors){
           if(err)console.log(err);

            if(!sensors){
                return res.send({'status': failure, message: 'No Available Sensors' });
            }
            res.json(sensors);
        });

    });

router.route('/data')

    .post(function(req,res){
        Sensor.findOne({ 'id' : req.body.sensorId},function(err, sensor){

            if(err) console.log(err);

            if(!sensor){
                return res.send({'status': 'failure', message: 'No Sensor Registered with this serial name'});
            }

            var sensorData = new SensorData();

            sensorData.sensorId = req.body.sensorId;
            sensorData.data  = req.body.data;

            sensorData.save(function(err) {
                if(err) console.log(err);

                return res.send({'status' : 'success', message: 'Successfully saved', 'data': sensorData.data});
            });

        });
    });

router.route('/data:sensorId')

    .get(function (req,res) {

        SensorData.findOne({ 'sensorId' : req.body.sensorId}, function(err, sensorData){

            if(err) console.log(err);

            if(!sensorData){
                return res.send({'status': 'failure', message: 'No Sensor Registered with this serial name'});
            }

            return res.send({'status' : 'success', 'data': sensorData.data});



        });



    });

module.exports = router;