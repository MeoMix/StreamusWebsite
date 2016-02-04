import Route from 'route/route';
import RouteType from 'route/routeType';
import TermsOfUseView from './termsOfUseView';

export default Route.extend({
  type: RouteType.TermsOfUse,
  viewClass: TermsOfUseView
});