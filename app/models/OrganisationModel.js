const mongoose = require('mongoose');

const OrganisationSchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true },
  location: { type: String, trim: true },
  // org_type_id: { type: String, trim: true },
  is_active: { type: Boolean, default: true },
  created_by: String,
  modified_by: String,
},
{ timestamps: true });

OrganisationSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

const Organisation = mongoose.model('organisation', OrganisationSchema);
module.exports = Organisation;

