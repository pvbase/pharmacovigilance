const Designation = require('../models/DesignationModel')

exports.createDesignation = function (req, res) {
  var designationDetails = req.body //Get the parsed information

  if (!designationDetails.name || !designationDetails.location) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newOrgDetails = new Designation({
      dName: designationDetails.dName,
      departmentId: designationDetails.departmentId,
      designationCode: designationDetails.designationCode,
      desc: designationDetails.desc,
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
          message: 'New designation added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getDesignationDetails = function (req, res) {
  Designation.findOne({ _id: req.params.id }, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Designation does not exist' })
  })
}

exports.showAllDesignationDetails = function (req, res) {
  Designation.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Designation does not exist' })
  })
}

exports.updateDesignationDetails = function (req, res) {
  Designation.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Designation data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deleteDesignation = function (req, res) {
  Designation.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Designation has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
