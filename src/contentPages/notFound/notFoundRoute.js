import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import NotFoundView from './notFoundView.js';

export default Route.extend({
  type: RouteType.NotFound,
  viewClass: NotFoundView
});
