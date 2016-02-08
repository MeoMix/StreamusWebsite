import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import GettingStartedView from './gettingStartedView.js';

export default Route.extend({
  type: RouteType.GettingStarted,
  viewClass: GettingStartedView
});