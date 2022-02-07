const Group = require('../models/GroupModel');

exports.createGroup = function (req, res) {
    if (!req.body.name) {
        res.json({ message: "Please provide all required parameters.", type: "error" });
    }
    else {
        var newGroupDetails = new Group({
            name: req.body.name,
            email:req.body.email,
            desc:req.body.desc,
            users:req.body.users
        });

        newGroupDetails.save(function (err, data) {
            if (err)
                return res.json({ message: "Database error", type: "error", data: err });
            else
                return res.json({ message: "New group added", type: "success", data: data });
        });
    }
}

exports.getGroupDetails = function (req, res) {
    Group.findOne({ _id: req.params.id }, {__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Group does not exist" });
    })
}

exports.showAllGroupDetails = function (req, res) {
    Group.find({},{__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Group does not exist" });
    })
}

exports.updateGroupDetails = function (req, res) {
    Group.update({ _id: req.params.id }, req.body ).then(function (data) {
        if (data.nModified)
            return res.json("Group data has been updated successfully");
        else
            return res.json({ message: "Nothing updated" });
    })
}

exports.deleteGroup = function (req, res) {
    Group.deleteOne({ _id: req.params.id }).then(function (data) {
        if (data.deletedCount)
            return res.json("Group has been deleted successfully");
        else
            return res.json({ message: "User does not exist" });
    })
}

