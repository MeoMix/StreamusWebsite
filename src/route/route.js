import { Object } from 'marionette';
import RouteType from 'route/routeType';

export default Object.extend({
  type: RouteType.NotFound,
  viewClass: null,

  show(routeData) {
    const viewOptions = this.getViewOptions(routeData.params);
    App.channels.content.commands.trigger('region:showView', this.viewClass, viewOptions);
  },

  getViewOptions() {},

  onError(error) {
    throw new Error(error);
  }
});