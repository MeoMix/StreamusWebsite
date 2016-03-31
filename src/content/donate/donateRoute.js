import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import DonateView from './donateView.js';

export default Route.extend({
  type: RouteType.Donate,
  viewClass: DonateView
});