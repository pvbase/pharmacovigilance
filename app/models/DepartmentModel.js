const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DepartmentSchema = mongoose.Schema(
  {
    dName: { type: String, trim: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'branch' },
    parentDepartment: { type: String, trim: true },
    departmentCode: { type: String, trim: true },
    desc: { type: String, trim: true },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

DepartmentSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Department = mongoose.model('department', DepartmentSchema)
module.exports = Department
