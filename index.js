var app = require('./app/server');

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  console.log('===Express server listening on port %d ===', server.address().port);
  console.log('env: NODE_ENV: %s, __SERVERRENDER__: %s', process.env.NODE_ENV, process.env.__SERVERRENDER__);
});

