const mongoose = require('mongoose')

const ProcessflowSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    desc: { type: String },
    seqNoId: { type: String },
    workflowId: { type: Schema.Types.ObjectId, ref: 'workflow' },
    approvalNo: { type: Number },
    approvalStatus: { type: String },
    waitFor: { type: String },
    approvedAction: { type: String },
    notApprovedAction: { type: String },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

ProcessflowSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Processflow = mongoose.model('processflow', ProcessflowSchema)

module.exports = Processflow
