var util = require('util');

var HTTPServer = exports.HTTPServer = function (options) {
  this.options = options || {};
};
util.inherits(HTTPServer, flatiron.App);

HTTPServer.prototype.listen = function (port, host, callback) {
  var that = this;
  connect.createServer(
     connect.bodyParser()
   , function(req, res) {
     console.log(
        req.method.yellow
      + " " + req.url
      + (that.options.showHeaders ?
          ' ==> ' + util.inspect(req.headers) :
          ''
        )
      + (typeof req.body =='undefined' ?
          '' :
          ' ==> '
          + util.inspect(req.body))
      );
   }
  );
};

HTTPServer.prototype.close = function () {
  return this.server.close();
};

exports.createServer = function (options) {
  return new HTTPServer(options);
};