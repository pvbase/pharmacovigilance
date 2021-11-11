exports.validFile = function (key, fileData) {
    let status = false;
    if (Object.keys(fileData).length === 0) {
        return true
    }
    const allKeys = Object.keys(fileData[0]);
    if (key.length == allKeys.length) {
        for (let index = 0; index < allKeys.length; index++) {
            if (key.indexOf(allKeys[index].toLowerCase()) == -1) {
                status = true
                break;
            }
        }
        return status
    }
    else {
        return true;
    }
}

