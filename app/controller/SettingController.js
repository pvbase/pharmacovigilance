const Setting = require('../models/SettingsModel')

exports.createSetting = function (req, res) {
  var settingDetails = req.body //Get the parsed information

  if (!settingDetails.name || !settingDetails.location) {
    res.json({
      message: 'Please provide all required parameters.',
      type: 'error',
    })
  } else {
    var newSettingDetails = new Setting({
      country: {
        countryname: settingDetails.countryname,
        state: settingDetails.state,
        defaultcurrency: settingDetails.defaultcurrency,
        currencychoice: settingDetails.currencychoice,
        status: settingDetails.status,
        
      },
      company: {
        companytype: settingDetails.companytype,
        descripation: settingDetails.descripation,
        abbreviation: settingDetails.abbreviation,
        status: settingDetails.status,
      },
      industry:{
        industyrtype: settingDetails.industyrtype,
        descripation: settingDetails.descripation,
        abbreviation: settingDetails.abbreviation,
        status: settingDetails.status,
      },
      subindustry:{
        subindustrytype:settingDetails.subindustrytype, 
        industyrtype: settingDetails.industyrtype,
        descripation: settingDetails.descripation,
        abbreviation: settingDetails.abbreviation,
        status: settingDetails.status,
      },
      currencyandforex:{
        defautcurrency:settingDetails.defautcurrency,
        currencychoice: settingDetails.currencychoice,
        convertto: settingDetails.convertto,
        dateofforex: settingDetails.dateofforex,
      },
      logo:{
        logoupload:settingDetails.logoupload
      },
      financeDetails:{
        startMonth:settingDetails.startMonth,
        endMonth:settingDetails.endMonth,
        financialYear:settingDetails.financialYear,
        setDate:settingDetails.setDate,
        status:settingDetails.status,
      },
      templates:{
        email: [
            {
              name: settingDetails.name,
              date: settingDetails.data,
              createdBy: settingDetails.createdBy,
              recipients: settingDetails.recipients,
              status: settingDetails.status,
            },
          ],
          sms: [
            {
              name:settingDetails.name,
              date:settingDetails.data,
              createdBy:settingDetails.createdBy,
              recipients:settingDetails.recipients,
              status: settingDetails.status,
            },
          ],
          dateFormat: [
            {
              name:settingDetails.name,
              format:settingDetails.format,
              display:settingDetails.display,
              status:settingDetails.status,
            },
          ],
          userGroup: {
            uniqueGroup:settingDetails.uniqueGroup,
          },
      }
    })

    newSettingDetails.save(function (err, data) {
      if (err)
        return res.json({
          message: 'Database error',
          type: 'error',
          data: err.message,
        })
      else
        return res.json({
          message: 'New Setting added',
          type: 'success',
          data: data,
        })
    })
  }
}

exports.getSettingDetails = function (req, res) {
  Setting.findOne({ _id: req.params.id }, { __v: 0 }).then(function (
    data,
  ) {
    if (data) return res.json(data)
    else return res.json({ message: 'Setting does not exist' })
  })
}

exports.showAllSettingDetails = function (req, res) {
  Setting.find({}, { __v: 0 }).then(function (data) {
    if (data) return res.json(data)
    else return res.json({ message: 'Setting does not exist' })
  })
}

exports.updateSettingDetails = function (req, res) {
  Setting.update({ _id: req.params.id }, req.body).then(function (data) {
    if (data.nModified)
      return res.json('Setting data has been updated successfully')
    else return res.json({ message: 'Nothing updated' })
  })
}

exports.deleteSetting = function (req, res) {
  Setting.deleteOne({ _id: req.params.id }).then(function (data) {
    if (data.deletedCount)
      return res.json('Setting has been deleted successfully')
    else return res.json({ message: 'User does not exist' })
  })
}
