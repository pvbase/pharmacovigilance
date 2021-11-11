const Organisation = require('../models/OrganisationModel');


exports.createOrganisation = function (req, res) {
    var orgDetails = req.body; //Get the parsed information

    if (!orgDetails.name || !orgDetails.location) {
        res.json({ message: "Please provide all required parameters.", type: "error" });
    }
    else {
        var newOrgDetails = new Organisation({
            name: orgDetails.name,
            location: orgDetails.location
        });

        newOrgDetails.save(function (err, data) {
            if (err)
                return res.json({ message: "Database error", type: "error", data: err });
            else
                return res.json({ message: "New organisation added", type: "success", data: data });
        });
    }
}

exports.getOrganisationDetails = function (req, res) {
    Organisation.findOne({ _id: req.params.id }, {__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Organisation does not exist" });
    })
}

exports.showAllOrganisationDetails = function (req, res) {
    Organisation.find({},{__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Organisation does not exist" });
    })
}

exports.updateOrganisationDetails = function (req, res) {
    Organisation.update({ _id: req.params.id }, req.body ).then(function (data) {
        if (data.nModified)
            return res.json("Organisation data has been updated successfully");
        else
            return res.json({ message: "Nothing updated" });
    })
}

exports.deleteOrganisation = function (req, res) {
    Organisation.deleteOne({ _id: req.params.id }).then(function (data) {
        if (data.deletedCount)
            return res.json("Organisation has been deleted successfully");
        else
            return res.json({ message: "User does not exist" });
    })
}

