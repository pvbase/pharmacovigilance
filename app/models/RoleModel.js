const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true },
  // access_id: { type: String, trim: true },
  is_active: { type: Boolean, default: true },
  created_by: String,
  created_on: { type: Date, default: Date.now },
  modified_by: String,
  modified_on: { type: Date, default: Date.now }
});

RoleSchema.pre('update', function() {
  this.update({},{ $set: { modified_on: new Date() } });
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;

