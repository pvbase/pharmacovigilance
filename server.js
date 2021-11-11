const app = require('./config/express'),
  config = require('./config/env');

//PORT ENVIRONMENT VARIABLE

app.listen(config.port, function (err) {
  if (err) throw err
  console.log('App listening on server ' + config.port)
})

// module.exports.handler = serverless(app);
