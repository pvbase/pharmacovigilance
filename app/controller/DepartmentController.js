const Department = require('../models/DepartmentModel')
exports.createDepartment = function (req, res) {
  var deptDetails = req.body //Get the parsed information

  if (!deptDetails.name || !deptDetails.location) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newOrgDetails = new Department({
      dName: deptDetails.dName,
      branchId: deptDetails.branchId,
      parentDepartment: deptDetails.parentDepartment,
      departmentCode: deptDetails.departmentCode,
      desc: deptDetails.desc,
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
          message: 'New department added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getDepartmentDetails = function (req, res) {
  Department.findOne({ _id: req.params.id }, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Department does not exist' })
  })
}

exports.showAllDepartmentDetails = function (req, res) {
  Department.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Department does not exist' })
  })
}

exports.updateDepartmentDetails = function (req, res) {
  Department.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Department data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deleteDepartment = function (req, res) {
  Department.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Department has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
