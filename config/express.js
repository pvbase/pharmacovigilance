const express = require("express"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  config = require("./env"),
  routes = require("../app/route"),
  cors = require("cors"),
  app = express();
const options = {
  explorer: false,
  // customCss: '.topbar { display: none }',
  // customSiteTitle: 'Test API'
  // customfavIcon:''
};
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");
const middleware = require("../app/middleware/middleware");

const node_acl = require("acl");
const mongoose = require("mongoose");
const fs = require("fs");
//Connecting MongoDB using mongoose to our application
mongoose.connect(config.db, { useNewUrlParser: true,
    useUnifiedTopology: true });
mongoose.Promise = global.Promise;
//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on("connected", function () {
  console.log("Mongoose default connection open to " + config.db);
//   let rawdata = fs.readFileSync("./app/acl/acl.json");
//   let roleData = JSON.parse(rawdata);
//   console.log(roleData);
//   acl = new node_acl(new node_acl.mongodbBackend(mongoose.connection.db, config.aclPrefix));
//   acl.allow(roleData);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(function (req, res, next) {
//   req.acl = acl;
  if (
    req.originalUrl === "/api/v1/user" ||
    req.originalUrl === "/api/v1/user/login" 
  ) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token) middleware.checkToken(req, res, next);
    else return next();
  } else {
    middleware.checkToken(req, res, next);
  }
});
app.use(routes);
// catch 404
app.use((req, res, next) => {
	return res.status(404).send({
	  message: "API Not Found",
	  statusCode: "404",
	  data: null,
	});
  });
  app.use(function (err, req, res, next) {
	console.error(err.stack);
	// db logger comes here
	next();
	//res.status(500).send('Something broke!')
  });
  app.set("x-powered-by", false);





module.exports = app;
