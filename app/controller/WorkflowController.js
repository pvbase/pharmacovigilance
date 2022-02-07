const Workflow = require('../models/WorkflowModel')

exports.createWorkflow = function (req, res) {
  var workflowDetails = req.body //Get the parsed information

  if (!workflowDetails.name || !workflowDetails.seqNo) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newOrgDetails = new Workflow({
      name: workflowDetails.name,
      seqNo: workflowDetails.seqNo,
      startPoint: workflowDetails.startPoint,
      endPoint: workflowDetails.endPoint,
      flow: workflowDetails.flow,
    })

    newOrgDetails.save(function (err, data) {
      if (err)
        return res.json({
          message: 'Database error',
          type: 'error',
          data: err.message,
        })
      else
        return res.json({
          message: 'New workflow added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getWorkflowDetails = function (req, res) {
  Workflow.findOne({ _id: req.params.id }, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Workflow does not exist' })
  })
}

exports.showAllWorkflowDetails = function (req, res) {
  Workflow.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Workflow does not exist' })
  })
}

exports.updateWorkflowDetails = function (req, res) {
  Workflow.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Workflow data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deleteWorkflow = function (req, res) {
  Workflow.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Workflow has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
