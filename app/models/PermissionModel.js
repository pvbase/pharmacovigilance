const mongoose = require('mongoose')

const PermissionSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    permissionCode: { type: String },
    desc: { type: String },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

PermissionSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Permission = mongoose.model('permission', PermissionSchema)

module.exports = Permission
