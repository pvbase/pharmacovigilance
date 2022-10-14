const Mapping = require('../models/MappingModel');

exports.createMapping = function (req, res) {
    if (!req.body.name) {
        res.json({ message: "Please provide all required parameters.", type: "error" });
    }
    else {
        var newMappingDetails = new Mapping({
            Group:req.body.Group,
            users:req.body.users
        });

        newMappingDetails.save(function (err, data) {
            if (err)
                return res.json({ message: "Database error", type: "error", data: err });
            else
                return res.json({ message: "New group added", type: "success", data: data });
        });
    }
}

exports.getMappingDetails = function (req, res) {
    Mapping.findOne({ _id: req.params.id }, {__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Mapping does not exist" });
    })
}

exports.showAllMappingDetails = function (req, res) {
    Mapping.find({},{__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Mapping does not exist" });
    })
}

exports.updateMappingDetails = function (req, res) {
    Mapping.update({ _id: req.params.id }, req.body ).then(function (data) {
        if (data.nModified)
            return res.json("Mapping data has been updated successfully");
        else
            return res.json({ message: "Nothing updated" });
    })
}

exports.deleteMapping = function (req, res) {
    Mapping.deleteOne({ _id: req.params.id }).then(function (data) {
        if (data.deletedCount)
            return res.json("Mapping has been deleted successfully");
        else
            return res.json({ message: "User does not exist" });
    })
}

