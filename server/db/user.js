var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    // these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
		avatar:String,
		address:String,
		create_at  :  { type: Date, default: Date.now }
});


UserSchema.methods.findByName = function(cb){
  return this.model('UserModel').find({username:this.username},cb);
}

UserSchema.methods.is_exist = function(cb){
	return this.model('UserModel').findOne({ username:this.username,password:this.password }, cb);
}

// define a static for example
UserSchema.statics.delete_by_name = function (name, cb_succ,cb_fail) {

};


module.exports = mongoose.model('UserModel', UserSchema);