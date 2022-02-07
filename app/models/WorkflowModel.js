const mongoose = require('mongoose')

const WorkflowSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    seqNo: { type: Number },
    startPoint: { type: String },
    endPoint: { type: String },
    flow: { type: String },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

WorkflowSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Workflow = mongoose.model('workflow', WorkflowSchema)

module.exports = Workflow
