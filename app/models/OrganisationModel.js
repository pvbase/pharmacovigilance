const mongoose = require('mongoose');

const OrganisationSchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true },
  location: { type: String, trim: true },
  // org_type_id: { type: String, trim: true },
  is_active: { type: Boolean, default: true },
  created_by: String,
  created_on: { type: Date, default: Date.now },
  modified_by: String,
  modified_on: { type: Date, default: Date.now }
});

OrganisationSchema.pre('update', function() {
  this.update({},{ $set: { modified_on: new Date() } });
});

const Organisation = mongoose.model('organisation', OrganisationSchema);
module.exports = Organisation;

