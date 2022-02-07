const mongoose = require('mongoose')

const MappingSchema = mongoose.Schema(
  {
    groupIds: { type: Array},
    userIds: { type: Array },
    workflowIds: { type: Array },
    processIds: { type: Array },
    permissionIds: { type: Array },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

MappingSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Mapping = mongoose.model('mappings', MappingSchema)

module.exports = Mapping
