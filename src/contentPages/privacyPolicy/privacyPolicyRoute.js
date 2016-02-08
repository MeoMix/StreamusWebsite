import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import PrivacyPolicyView from './privacyPolicyView.js';

export default Route.extend({
  type: RouteType.PrivacyPolicy,
  viewClass: PrivacyPolicyView
});