const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema(
  {
    legel: {
      cName: { type: String, trim: true },
      typeOfBusiness: { type: String },
      address1: { type: String },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String },
      tax: { type: String },
      industry: { type: String },
    },
    contact: {
      cName: { type: String, trim: true },
      designation: { type: String },
      email1: { type: String },
      email2: { type: String },
      phone1: { type: String },
      phone2:{ type: String },
    },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

ProfileSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Profile = mongoose.model('profile', ProfileSchema)

module.exports = Profile
