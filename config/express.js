const express = require('express'),
	bodyParser = require('body-parser'),
	routing = require('../app/route'),
	cors = require('cors'),
	app = express(),
	swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./../swagger.json');
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	res.header('Access-Control-Allow-Headers', 'x-auth-token');
	next();
});
app.use(bodyParser.json({ limit: '5mb' }));
// app.use(cors())
app.use(bodyParser.urlencoded({ extended: 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(routing);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404
app.use((req, res, next) => {
	return res.status(404).send({
		message: 'API Not Found',
		statusCode: '404',
		data: null,
	});
});
app.use(function(err, req, res, next) {
	console.error(err.stack);
	// db logger comes here
	next();
	//res.status(500).send('Something broke!')
});
app.set('x-powered-by', false);

module.exports = app;
