const AWS = require('aws-sdk');
const config = require("../config/env")

const ses = new AWS.SES({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
    region: "us-east-1",
    apiVersion: '2010-12-01'
});

exports.sendMail = async function(fromAddress, toAddresses, data,subject){
// exports.sendMail = async function () {

    // Create sendEmail params 
    var params = {
        Destination: { /* required */
            ToAddresses: toAddresses
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: data
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: fromAddress, /* required */
    };
     await ses.sendEmail(params).promise();
}

