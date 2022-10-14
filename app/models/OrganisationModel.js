const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrganisationSchema = mongoose.Schema({
  legal:{
    companyName:{type:String},
    typeofBuisiness:{type:String},
    adress1:{type:String},
    adress2:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    postcode:{type:String},
    tax:{type:String},
    industryVertical:{type:String}


  },
 contact:{
  contactName: {type:String},
  designation: {type:String},
  email1:{type:String},
  email2:{type:String},
  phone1:{type:Number},
  phone2:{type:Number}
 },

 
},
{ timestamps: true });

OrganisationSchema.pre('update', function() {
  this.update({},{ $set: { updatedAt: new Date() } });
});

const Organisation = mongoose.model('organisation', OrganisationSchema);
module.exports = Organisation;

