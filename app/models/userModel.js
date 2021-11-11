const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true, required: true, trim: true },
  password: String,
  role_id: String,
  org_id: {type:Schema.Types.ObjectId, ref: "organisation"},
  org_name:{type:String},
  crypto_keys: String,
  location:String,
  identity_id:String,
  is_active: { type: Boolean, default: true },
  created_by: String,
  created_on: { type: Date, default: Date.now },
  modified_by: String,
  modified_on: { type: Date, default: Date.now }
});

// Virtual for author's full name
// userSchema.virtual('username').get(function () {
//   return this.username;
// });

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.pre('update', function() {
  this.update({},{ $set: { modified_on: new Date() } });
});

//Export function to create "Person" model class
const User = mongoose.model('User', UserSchema);
module.exports = User;
// module.exports = mongoose.model('User', UserSchema);

