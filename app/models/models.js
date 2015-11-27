/**
 * Created by karanbir on 15/11/15.
 */
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    user_type:String,
    created_at: {type: Date, default: Date.now}
});

mongoose.model('User', userSchema);