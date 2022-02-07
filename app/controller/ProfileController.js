const Profile = require('../models/ProfileModel')

exports.createProfile = function (req, res) {
  var orgDetails = req.body //Get the parsed information

  if (!orgDetails.name || !orgDetails.location) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newOrgDetails = new Profile({
      legel: {
        cName: orgDetails.cName,
        typeOfBusiness: orgDetails.typeOfBusiness,
        address1: orgDetails.address1,
        address2: orgDetails.address2,
        city: orgDetails.city,
        state: orgDetails.state,
        country: orgDetails.country,
        pincode: orgDetails.pincode,
        tax: orgDetails.tax,
        industry: orgDetails.industry,
      },
      contact: {
        cName: orgDetails.cName,
        designation: orgDetails.designation,
        email1: orgDetails.email1,
        email2: orgDetails.email2,
        phone1: orgDetails.phone1,
        phone2: orgDetails.phone2,
      },
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
          message: 'New profile added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getProfileDetails = function (req, res) {
  Profile.findOne({ _id: req.params.id }, { __v: 0 }).then(function (
    data,
  ) {
    if (data) return res.json(data)
    else return res.json({ message: 'Profile does not exist' })
  })
}

exports.showAllProfileDetails = function (req, res) {
  Profile.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Profile does not exist' })
  })
}

exports.updateProfileDetails = function (req, res) {
  Profile.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Profile data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deleteProfile = function (req, res) {
  Profile.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Profile has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
