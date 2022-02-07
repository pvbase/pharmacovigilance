const mongoose = require('mongoose')

const DesignationSchema = mongoose.Schema(
  {
    dName: { type: String, trim: true },
    departmentId: { type: Schema.Types.ObjectId, ref: 'department' },
    designationCode: { type: String, trim: true },
    desc: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

DesignationSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Designation = mongoose.model('designation', DesignationSchema)

module.exports = Designation
