import Route from 'route/route';
import RouteType from 'route/routeType';
import GettingStartedView from './gettingStartedView';

export default Route.extend({
  type: RouteType.GettingStarted,
  viewClass: GettingStartedView
});