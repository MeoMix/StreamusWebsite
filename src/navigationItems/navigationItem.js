import { Model } from 'backbone';
import RouteType from 'route/routeType';

export default Model.extend({
  defaults: {
    route: RouteType.NotFound,
    isActive: false,
    isSecondary: false,
    text: ''
  }
});