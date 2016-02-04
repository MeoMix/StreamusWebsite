import Route from 'route/route';
import RouteType from 'route/routeType';
import ContactView from './contactView';
import Contact from './contact';

export default Route.extend({
  type: RouteType.Contact,
  viewClass: ContactView,

  getViewOptions() {
    return {
      model: new Contact()
    };
  }
});