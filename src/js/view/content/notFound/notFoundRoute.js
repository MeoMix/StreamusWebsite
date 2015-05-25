define(function(require) {
  'use strict';

  var Route = require('route');
  var RouteType = require('enum/routeType');
  var NotFoundView = require('view/content/notFound/notFoundView');

  var NotFoundRoute = Route.extend({
    type: RouteType.NotFound,
    viewClass: NotFoundView
  });

  return NotFoundRoute;
});