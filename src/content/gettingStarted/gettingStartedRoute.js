import Route from 'common/route';
import RouteType from 'common/enum/routeType';
import GettingStartedView from './gettingStartedView';

export default Route.extend({
  type: RouteType.GettingStarted,
  viewClass: GettingStartedView
});