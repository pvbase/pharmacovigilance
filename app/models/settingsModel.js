const mongoose = require('mongoose')

const SettingSchema = mongoose.Schema(
  {
    countryDetails: [
      {
        name: { type: String },
        code: { type: String },
        state: { type: String },
        currency: { type: String },
        forex: { type: String },
        dateOfForex: { type: Date },
        currencyChoice: { type: String },
        status: { type: Array },
      },
    ],
    companyDetails: [
      {
        type: { type: String },
        desc: { type: String },
        code: { type: String },
        status: { type: Array },
      },
    ],
    industryDetails: [
      {
        type: { type: String },
        desc: { type: String },
        code: { type: String },
        status: { type: Array },
      },
    ],
    subIndustryDetails: [
      {
        type: { type: String },
        desc: { type: String },
        code: { type: String },
        status: { type: Array },
      },
    ],
    logo: { type: String },
    financeDetails: [
      {
        startMonth: { type: String },
        endMonth: { type: String },
        financialYear: { type: String },
        setDate: { type: String },
        status: { type: Array },
      },
    ],
    templates: {
      email: [
        {
          name: { type: String },
          date: { type: Date },
          createdBy: { type: String },
          recipients: { type: String },
          status: { type: Array },
        },
      ],
      sms: [
        {
          name: { type: String },
          date: { type: Date },
          createdBy: { type: String },
          recipients: { type: String },
          status: { type: Array },
        },
      ],
    },
    dateFormat: [
      {
        name: { type: String },
        format: { type: Date },
        display: { type: String },
        status: { type: String },
      },
    ],
    userGroup: {
      uniqueGroup: { type: Boolean },
    },
    paymentGateway: { type: Object },
    emailServer: { type: Object },
    smsServer: { type: Object },
    is_active: { type: Boolean, default: true },
    created_by: String,
    modified_by: String,
  },
  { timestamps: true },
)

SettingSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } })
})

const Setting = mongoose.model('settings', SettingSchema)

module.exports = Setting
