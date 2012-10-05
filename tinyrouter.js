var optionalParam = /\((.*?)\)/g
  , namedParam    = /:\w+/g
  , splatParam    = /\*\w+/g
  , escapeRegExp  = /[-{}[\]+?.,\\^$|#\s]/g
  ;

module.exports = Router;

function Router(options) {
  var routes = (options.routes || {})
    , noop = function() {}
    , route, handler
    ;

  this.handlers = [];

  // create routes
  for(route in routes) {
    handler = routes[route];
    this.handlers.push({
      route: routeToRegExp(route),
      callback: (options[handler] || noop)
    });
  }
}

Router.prototype = {
  dispatch: function(fragment) {
    var args;

    this.handlers.forEach(function(handler) {
      if(handler.route.test(fragment)) {
        args = extractParams(handler.route, fragment);
        return handler.callback.apply(this, args);
      }
    });
  }
}

function routeToRegExp(route) {
  route = route.replace(escapeRegExp, '\\$&')
               .replace(optionalParam, '(?:$1)?')
               .replace(namedParam, '([^\/]+)')
               .replace(splatParam, '(.*?)');
  return new RegExp('^' + route + '$');
}

function extractParams(route, fragment) {
  return route.exec(fragment).slice(1);
}
