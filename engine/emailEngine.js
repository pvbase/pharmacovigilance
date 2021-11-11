/*jshint esversion: 6 */
const config = require('../config/env'),
    path = require('path'),
    templatesDir = path.resolve(__dirname, '../app/', 'emailTemplates'),
    nodemailer = require('nodemailer'),
    ejs = require('ejs');

function Emailer(templatePath, locals, options) {
    var self = this;
    self.options = options;
    self.templatePath = templatePath;
    self.locals = locals;
    self.smtpTransport = nodemailer.createTransport({

        service: config.smtp.service,
        port: 587,
        auth: {
            user: config.smtp.user,
            pass: config.smtp.pass
        }
    });
    // console.log(self.smtpTransport);
}

Emailer.prototype.getHTML = function (templatePath, locals, callback) {

    locals = locals || {};
    ejs.renderFile(templatesDir + "/" + templatePath, locals, function (err, html) {
        callback(err, html);
    });
};

Emailer.prototype.send = function () {
    return new Promise((resolve, reject) => {
        var self = this;

        self.getHTML(self.templatePath, self.locals, function (err, html) {

            if (err) {
                console.log(err);
            } else {
                self.options.html = html;
                // console.log(self.options)
                self.smtpTransport.sendMail(self.options, function (error, response) {
                    console.log("In this",error, response.envelope || response);
                    if (error) {
                            reject(error);
                        //self.res.send(500, error);
                    } else {
                            resolve(response);
                        //self.res.send(response.message);
                        //console.log("Message sent: " + response.message);
                    }

                    // if you don't want to use this transport object anymore, uncomment following line
                    //smtpTransport.close(); // shut down the connection pool, no more messages
                });

            }

        });
    });

};

module.exports = Emailer;