var appStatus = require(__CONFIG__.app_base_path + 'lib/status');

var middleware = function() {
  var NotFound = function(request, response) {
    response.status(appStatus('notFound')).json(
            {
              'status': 'fail',
              'data': 'The requested url "' + request.originalUrl
                      + '" is not supported by this service.'
            });
  };

  return {
    notFound: NotFound
  };
};

module.exports = middleware();