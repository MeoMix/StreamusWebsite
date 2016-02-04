import Route from 'route/route';
import RouteType from 'route/routeType';
import DonateView from './donateView';

export default Route.extend({
  type: RouteType.Donate,
  viewClass: DonateView
});