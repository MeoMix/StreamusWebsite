import Route from '../../common/route';
import RouteType from '../../common/enum/routeType';
import HomeView from './homeView';

export default Route.extend({
  type: RouteType.Home,
  viewClass: HomeView
});