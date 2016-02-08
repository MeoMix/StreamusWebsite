import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import TermsOfUseView from './termsOfUseView.js';

export default Route.extend({
  type: RouteType.TermsOfUse,
  viewClass: TermsOfUseView
});