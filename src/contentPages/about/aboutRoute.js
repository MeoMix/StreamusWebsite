import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import AboutView from './aboutView.js';

export default Route.extend({
  type: RouteType.About,
  viewClass: AboutView
});