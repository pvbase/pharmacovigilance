const Permission = require('../models/PermissionModel')

exports.createPermission = function (req, res) {
  var permissionDetails = req.body //Get the parsed information

  if (!permissionDetails.name || !permissionDetails.location) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newOrgDetails = new Permission({
      name: permissionDetails.name,
      permissionCode: permissionDetails.permissionCode,
      desc: permissionDetails.desc,
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
          message: 'New permission added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getPermissionDetails = function (req, res) {
  Permission.findOne({ _id: req.params.id }, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Permission does not exist' })
  })
}

exports.showAllPermissionDetails = function (req, res) {
  Permission.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Permission does not exist' })
  })
}

exports.updatePermissionDetails = function (req, res) {
  Permission.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Permission data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deletePermission = function (req, res) {
  Permission.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Permission has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
