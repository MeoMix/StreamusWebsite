import Route from 'route/route';
import RouteType from 'route/routeType';
import HomeView from './homeView';

export default Route.extend({
  type: RouteType.Home,
  viewClass: HomeView
});