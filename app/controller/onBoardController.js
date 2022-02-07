const Onboard = require('../models/OnboardModel');


exports.createOnboard = function (req, res) {
    var onboardDetails = req.body; //Get the parsed information

    if (!onboardDetails.name || !onboardDetails.location) {
        res.json({ message: "Please provide all required parameters.", type: "error" });
    }
    else {
        var newOrgDetails = new Onboard({
            name: onboardDetails.name,
            alias: onboardDetails.alias,
            cName:onboardDetails.cName,
            cEmail:onboardDetails.cEmail,
            cPhone:onboardDetails.cPhone,
            password: onboardDetails.password
        });

        newOrgDetails.save(function (err, data) {
            if (err)
                return res.json({ message: "Database error", type: "error", data: err.message });
            else
                return res.json({ message: "New onboard added", type: "success", data: data });
        });
    }
}

exports.getOnboardDetails = function (req, res) {
    Onboard.findOne({ _id: req.params.id }, {__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Onboard does not exist" });
    })
}

exports.showAllOnboardDetails = function (req, res) {
    Onboard.find({},{__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Onboard does not exist" });
    })
}

exports.updateOnboardDetails = function (req, res) {
    Onboard.update({ _id: req.params.id }, req.body ).then(function (data) {
        if (data.nModified)
            return res.json("Onboard data has been updated successfully");
        else
            return res.json({ message: "Nothing updated" });
    })
}

exports.deleteOnboard = function (req, res) {
    Onboard.deleteOne({ _id: req.params.id }).then(function (data) {
        if (data.deletedCount)
            return res.json("Onboard has been deleted successfully");
        else
            return res.json({ message: "User does not exist" });
    })
}

