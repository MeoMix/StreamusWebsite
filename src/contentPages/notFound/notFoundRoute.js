import Route from 'route/route';
import RouteType from 'route/routeType';
import NotFoundView from './notFoundView';

export default Route.extend({
  type: RouteType.NotFound,
  viewClass: NotFoundView
});
