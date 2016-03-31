import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import HomeView from './homeView.js';

export default Route.extend({
  type: RouteType.Home,
  viewClass: HomeView
});