define(function(require) {
  'use strict';

  var Route = require('route');
  var RouteType = require('enum/routeType');
  var HomeView = require('view/content/home/homeView');

  var HomeRoute = Route.extend({
    type: RouteType.Home,
    viewClass: HomeView
  });

  return HomeRoute;
});