import Route from 'route/route';
import RouteType from 'route/routeType';
import AboutView from './aboutView';

export default Route.extend({
  type: RouteType.About,
  viewClass: AboutView
});