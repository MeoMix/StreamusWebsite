import Route from '../../common/route';
import RouteType from '../../common/enum/routeType';
import NotFoundView from './notFoundView';

export default Route.extend({
  type: RouteType.NotFound,
  viewClass: NotFoundView
});
