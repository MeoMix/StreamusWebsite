import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import ContactView from './contactView.js';
import Contact from './contact.js';

export default Route.extend({
  type: RouteType.Contact,
  viewClass: ContactView,

  getViewOptions() {
    return {
      model: new Contact()
    };
  }
});