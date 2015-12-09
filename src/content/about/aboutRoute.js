import Route from 'common/route';
import RouteType from 'common/enum/routeType';
import AboutView from './aboutView';

export default Route.extend({
  type: RouteType.About,
  viewClass: AboutView
});