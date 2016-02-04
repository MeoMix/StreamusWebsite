import Route from 'route/route';
import RouteType from 'route/routeType';
import PrivacyPolicyView from './privacyPolicyView';

export default Route.extend({
  type: RouteType.PrivacyPolicy,
  viewClass: PrivacyPolicyView
});