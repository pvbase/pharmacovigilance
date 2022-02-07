const mongoose = require('mongoose')

const GroupSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String },
    desc: { type: String, trim: true },
    users: { type: Array },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

GroupSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Group = mongoose.model('group', GroupSchema)

module.exports = Group
