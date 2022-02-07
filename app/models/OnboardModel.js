const mongoose = require('mongoose');

const OnboardSchema = mongoose.Schema({
  name: { type: String, unique: true, trim: true },
  alias: { type: String, trim: true },
  cName:{ type: String, trim: true },
  cEmail:{ type: String, trim: true },
  cPhone:{ type: String, trim: true },
  // org_type_id: { type: String, trim: true },
  is_active: { type: Boolean, default: true },
  created_by: String,
  modified_by: String,
},
{ timestamps: true });

OnboardSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

const Onboard = mongoose.model('onboard', OnboardSchema);
module.exports = Onboard;

