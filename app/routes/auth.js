var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
module.exports = function(passport){

    // Login
    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {

            if (err) { return next(err); }

            if (!user) { return res.send({state: 'failure', user: null, message: info.message}); }

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send({state: 'success', user: user});
            });
        })(req, res, next);
    });


    //Registration of User.
    router.post('/register', function(req, res) {

        User.findOne({ 'email' :  req.body.email }, function(err, user) {

            // In case of any error, return using the done method
            if (err){
                return res.send({state: 'failure',message: 'Internal Error'});
            }

            // already exists
            if (user) {
                console.log('User Already exists with email '+req.body.email);
                return res.send({state: 'failure', message: 'User Already exists with email '+req.body.email});
            }else {

                async.waterfall([
                    function (done) {
                        crypto.randomBytes(20, function (err, buf) {
                            var token = buf.toString('hex');
                            done(err, token);
                        });
                    },
                    function (token, done) {
                        // if there is no user, create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.email = req.body.email;
                        newUser.password = req.body.password;
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;
                        newUser.address = req.body.address;
                        newUser.address2 = req.body.address2;
                        newUser.userType = req.body.userType;
                        newUser.city = req.body.city;
                        newUser.state = req.body.state;
                        newUser.phoneNumber = req.body.phoneNumber;
                        newUser.verifyToken = token;

                        newUser.save(function (err) {
                            if (err) console.log(err);
                            done(err, token, newUser);
                        });
                    },
                    function (token, newUser, done) {
                        var smtpTransport = nodemailer.createTransport('SMTP', {
                            service: 'hotmail',
                            auth: {
                                user: 'er.karanbirsingh@outlook.com',
                                pass: 'kbs009199359'
                            }
                        });
                        var mailOptions = {
                            to: newUser.email,
                            from: 'passwordreset@demo.com',
                            subject: 'SensorBook Email verification',
                            text: 'Thanks for Signing up on SensorBook. Please Click on the below link to verify your email \n\n' +
                            'http://' + req.headers.host + '/api/verify/' + token + '\n\n' +
                            'If you did not sign up at SensorBook, please ignore this email.\n'
                        };
                        smtpTransport.sendMail(mailOptions, function (err) {
                            res.send({'status': 'success', 'message': 'Registration Successful, Please verify your email and Login.'});
                            done(err, 'done');
                        });
                    }
                ], function (err) {
                    if (err) console.log(err);

                });
            }
        });
    });

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //Update the user values
    router.route('/update')

        .put(function(req,res){
            User.findById(req.user.id, function(err, user){
                if(!user){
                    return res.send({state: 'failure', user: null, message: "No User with that email" + req.body.email});
                }else{
                    user.password= req.body.password;
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.address = req.body.address;
                    user.address2 = req.body.address2;
                    user.city = req.body.city;
                    user.state = req.body.state;
                    user.phoneNumber = req.body.phoneNumber;

                    // save the user
                    user.save(function(err) {
                        if (err)
                            console.log(err);
                        return res.send({state: 'success', message: "Successfully Updated"})
                    });
                }
            });
        });
    return router;

};