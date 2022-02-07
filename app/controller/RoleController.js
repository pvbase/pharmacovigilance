const Role = require('../models/RoleModel');

exports.createRole = function (req, res) {
    if (!req.body.name) {
        res.json({ message: "Please provide all required parameters.", type: "error" });
    }
    else {
        var newRoleDetails = new Role({
            name: req.body.name,
            code:req.body.code,
            desc:req.body.desc,
            status:req.body.status
        });

        newRoleDetails.save(function (err, data) {
            if (err)
                return res.json({ message: "Database error", type: "error", data: err });
            else
                return res.json({ message: "New role added", type: "success", data: data });
        });
    }
}

exports.getRoleDetails = function (req, res) {
    Role.findOne({ _id: req.params.id }, {__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Role does not exist" });
    })
}

exports.showAllRoleDetails = function (req, res) {
    Role.find({},{__v: 0}).then(function (data) {
        if (data)
            return res.json(data);
        else
            return res.json({ message: "Role does not exist" });
    })
}

exports.updateRoleDetails = function (req, res) {
    Role.update({ _id: req.params.id }, req.body ).then(function (data) {
        if (data.nModified)
            return res.json("Role data has been updated successfully");
        else
            return res.json({ message: "Nothing updated" });
    })
}

exports.deleteRole = function (req, res) {
    Role.deleteOne({ _id: req.params.id }).then(function (data) {
        if (data.deletedCount)
            return res.json("Role has been deleted successfully");
        else
            return res.json({ message: "User does not exist" });
    })
}

