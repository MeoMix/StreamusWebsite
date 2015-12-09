import Route from 'common/route';
import RouteType from 'common/enum/routeType';
import DonateView from './donateView';

export default Route.extend({
  type: RouteType.Donate,
  viewClass: DonateView
});