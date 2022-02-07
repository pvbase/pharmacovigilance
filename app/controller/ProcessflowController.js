const Processflow = require('../models/ProcessflowModel')

exports.createProcessflow = function (req, res) {
  var processflowDetails = req.body //Get the parsed information

  if (!processflowDetails.name || !processflowDetails.seqNo) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newOrgDetails = new Processflow({
      name: processflowDetails.name,
      desc:processflowDetails.desc,
      seqNoId: processflowDetails.seqNoId,
      workflowId:processflowDetails.workflowId,
      approvalNo:processflowDetails.approvalNo,
      approvalStatus:processflowDetails.approvalStatus,
      waitFor:processflowDetails.waitFor,
      approvedAction:processflowDetails.approvedAction,
      notApprovedAction:processflowDetails.notApprovedAction
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
          message: 'New process flow added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getProcessflowDetails = function (req, res) {
  Processflow.findOne({ _id: req.params.id }, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Processflow does not exist' })
  })
}

exports.showAllProcessflowDetails = function (req, res) {
  Processflow.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Processflow does not exist' })
  })
}

exports.updateProcessflowDetails = function (req, res) {
  Processflow.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Processflow data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deleteProcessflow = function (req, res) {
  Processflow.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Processflow has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
