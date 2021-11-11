let jwt = require('jsonwebtoken');
const config = require('../../config/env');

let checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	// Express headers are auto converted to lowercase

	if (token) {
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		jwt.verify(token, (err, decoded) => {
			if (err) {
				return res.json({
					success: false,
				});
			} else {
				req.decoded = decoded;
				//req.user = { id: decoded.email }
				req.user = decoded;
				aclPermissionCheck(req, res, next);
			}
		});
	} else {
		return res.json({
			success: false,
		});
	}
};

let aclPermissionCheck = (req, res, next) => {
	if (req.user) {
		let url = req.url;
		if (req.method.toLowerCase() != 'post' || url == '/api/v1/user/login') {
			url = url
				.split('/')
				.slice(0, 3 + 1)
				.join('/');
		}
	}
};

module.exports = {
	checkToken: checkToken,
	aclPermissionCheck: aclPermissionCheck,
};
