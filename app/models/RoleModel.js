const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true },
  // access_id: { type: String, trim: true },
  is_active: { type: Boolean, default: true },
  created_by: String,
  modified_by: String,
},
{ timestamps: true });

RoleSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;

