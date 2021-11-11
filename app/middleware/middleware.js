let jwt = require('jsonwebtoken');
const config = require('../../config/env'),
messages = require('../../literals/generalMsg');

const mongoose = require('mongoose');
const node_acl = require('acl');
acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, config.aclPrefix));

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    // Express headers are auto converted to lowercase

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: messages.errMsg.invalidToken
                });
            } else {
                req.decoded = decoded;
                //req.user = { id: decoded.email }
                req.user = decoded;
                aclPermissionCheck(req, res, next)
            }
        });
    } else {
        return res.json({
            success: false,
            message: messages.errMsg.tokenNOtFound
        });
    }
};

let aclPermissionCheck = (req, res, next) => {
    if (req.user) {

        let url = req.url;
        if (req.method.toLowerCase() != "post" || url == "/api/v1/user/login") {
            url = url.split('/').slice(0, 3 + 1).join('/');
        } 

        acl.isAllowed(req.user.id, url, req.method.toLowerCase(), (error, allowed) => {
            if(true){
            // if (allowed) {
                return next();
            } else {
                return res.json({ message: 'Insufficient permissions to access resource' })
            }
        });
    }
};

module.exports = {
    checkToken: checkToken,
    aclPermissionCheck: aclPermissionCheck
}