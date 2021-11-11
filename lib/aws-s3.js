const fs = require('fs');
const AWS = require('aws-sdk');
const config = require("../config/env")

const s3 = new AWS.S3({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
});

exports.uploadFileFromPathToS3 = async function (filePath, filename) {
    let response = { status: false }
    const data = fs.readFileSync(filePath);
    const params = {
        Bucket: config.bucketName, // pass your bucket name
        Key: filename, // file will be saved as testBucket/contacts.csv
        Body: data
    };
    try {
        const fileUploadStatus = await s3.upload(params).promise();
        fs.unlinkSync(filePath);
        response.status = true;
        response.data = fileUploadStatus;
        return response
    }
    catch (e) {
        console.log(e)
        response.message = e
        return response
    }
}

exports.downloads3File = async function (fileName) {
    let response = { status: true }
    var options = {
        Bucket: config.bucketName,
        Key: fileName,
    };
    try {
        const data = await s3.getObject(options).promise()
        response.data = data.Body;
    }
    catch (err) {
        response.status = false
        response.message = err
    }
    return response;
}

