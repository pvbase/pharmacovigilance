const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../../config/env"),
  messages = require("../../literals/user");
const mongoose = require("mongoose");
const _ = require("lodash");
const resmsg = require("../../literals/resMessages");

exports.register = function (req, res) {
  var inputData = req.body; //Get the parsed information

  if (
    !inputData.fname ||
    !inputData.lname ||
    !inputData.email ||
    !inputData.password ||
    !inputData.confirmPassword ||
    !inputData.role_id ||
    !inputData.org_id ||
    !inputData.location ||
    !inputData.created_by
  ) {
    res.json({ message: messages.errMsg.invalidInfo, type: "error" });
  } else if (!validEmail(inputData.email)) {
    res.json({ message: messages.errMsg.invalidEmail, type: "error" });
  } else if (inputData.password != inputData.confirmPassword) {
    res.json({ message: messages.errMsg.invalidEmail, type: "error" });
  } else {
    var userDetails = new User({
      fname: inputData.fname,
      lname: inputData.lname,
      email: inputData.email,
      password: inputData.password,
      role_id: inputData.role_id,
      org_id: inputData.org_id,
      org_name: inputData.org_name,
      location: inputData.location,
      created_by: inputData.created_by,
    });

    // if (req.decoded && req.decoded.id) {
    //     userDetails.created_by = req.decoded.id
    // }

    userDetails.save(function (err, userDetails) {
      if (err)
        return res.json({
          message: messages.errMsg.internalServerError,
          type: "error",
          data: err,
        });
      else {
        return res.json({
          message: messages.successMsg.register,
          type: "success",
          data: userDetails,
        });
      }
    });
  }
};

exports.login = function (req, res) {
  if (!validEmail(req.body.username)) {
    res.json({ message: "Enetr valid email", type: "error" });
  } else {
    User.authenticate(req.body.username, req.body.password, function (
      error,
      user
    ) {
      if (error || !user) {
        return res.json({ type: "error", message: error });
      } else {
        let token = jwt.sign(
          {
            email: user.email,
            id: user._id,
            role_id: user.role_id,
            org_id: user.org_id,
            identity_id: user.identity_id,
          },
          config.jwtSecret,
          {
            expiresIn: config.jwtTokenexpiresTime, // expires in 24 hours
          }
        );

        // req.acl.isAllowed(user.email, '/api/v1/user', 'get', function (err, res) {
        //     if (res) {
        //         console.log("User " + user.email + " is allowed to view user")
        //     }
        // })
        return res.json({
          success: true,
          message: messages.successMsg.register,
          fname: user.fname,
          lname: user.lname,
          role: user.role_id,
          token: token,
          user_id: user._id,
          userDetails: user,
        });
      }
    });
  }
};

exports.getUserDetails = function (req, res) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findOne({ _id: req.params.id }, { _id: 0, password: 0 }).then(
      function (user) {
        if (user) return res.json(user);
        else return res.json({ message: "User does not exist" });
      }
    );
  } else {
    return res.json({ message: "Please provide correct id" });
  }
};

exports.getAllUserDetails = function (req, res) {
  User.find({}, { password: 0 }).then(function (user) {
    if (user) return res.json(user);
    else return res.json({ message: "User does not exist" });
  });
};

exports.deleteUser = function (req, res) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.deleteOne({ _id: req.params.id }).then(function (user) {
      if (user.deletedCount)
        return res.json("User has been deleted successfully");
      else return res.json({ message: "User does not exist" });
    });
  } else {
    return res.json({ message: "Please provide correct id" });
  }
};

exports.updateUserDetails = function (req, res) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.update({ _id: req.params.id }, req.body).then(function (user) {
      if (user.nModified)
        return res.json("User data has been updated successfully");
      else return res.json({ message: "Nothing updated" });
    });
  } else {
    return res.json({ message: "Please provide correct id" });
  }
};

//collect user count
exports.userCounts = function (req, res) {
  User.find({})
    .then((userData) => {
      var manufacturer = _.filter(userData, { role_id: "Manufacturer" });
      var warehouse = _.filter(userData, { role_id: "Warehouse" });
      var retailer = _.filter(userData, { role_id: "Retailer" });
      var certifier = _.filter(userData, { role_id: "Certifier" });
      var obj = {
        manufacturer: manufacturer.length,
        warehouse: warehouse.length,
        retailer: retailer.length,
        certifier: certifier.length,
      };
      return res.status(200).send({ success: true, data: obj });
    })
    .catch((err) => {
      return res.status(400).send({ success: false, data: err });
    });
};

exports.reconcileEmail = async function (orgName) {
  const emailDetails = await User.find({ org_name: orgName }, { email: 1 });
  let email = [];
  emailDetails.forEach((element) => {
    email.push(element.email);
  });

  return email;
};

exports.getControllerIdentity = async function () {
  const controllerUser = await User.findOne(
    { role_id: "Controller" },
    { identity_id: 1 }
  );
  return controllerUser.identity_id;
};

exports.getUserIdentityId = async function (userId) {
  const userDetails = await User.findOne({ email: userId }, { identity_id: 1 });
  return userDetails;
};

// exports.forgotPassword = function(req,res){
//     User.findOne({email:req.body.email})
//     .then((data)=>{
//         console.log(data)
//     }).catch((err)=>{
//         console.log(err)
//     })
// }

validEmail = function (email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
