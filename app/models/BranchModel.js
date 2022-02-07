const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
  legel: {
    cName: { type: String, trim: true },
    typeOfBusiness: { type: String, trim: true },
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    pincode:{ type: String, trim: true },
    tax: { type: String, trim: true },
    industry: { type: String, trim: true }
  },
  contact: {
    cName: { type: String, trim: true },
    designation: { type: String, trim: true },
    email1: { type: String, trim: true },
    email2: { type: String, trim: true },
    phone1: { type: String, trim: true },
    phone2: { type: String, trim: true },
  },
  is_active: { type: Boolean, default: true },
  created_by: String,
  modified_by: String,
},
{ timestamps: true });

BranchSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

const Branch = mongoose.model('branch', BranchSchema);
module.exports = Branch;

