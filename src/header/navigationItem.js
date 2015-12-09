import { Model } from 'backbone';
import RouteType from 'common/enum/routeType';

export default Model.extend({
  defaults: {
    route: RouteType.NotFound,
    active: false,
    text: ''
  }
});