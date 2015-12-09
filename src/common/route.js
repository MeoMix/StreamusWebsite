import { Object } from 'marionette';
import _ from 'lodash';
import RouteType from 'common/enum/routeType';

export default Object.extend({
  type: RouteType.NotFound,
  viewClass: null,

  show(routeData) {
    App.channels.content.commands.trigger('region:hideView');

    const commandName = `region:showView:${this.type}`;
    const viewOptions = this.getViewOptions(routeData.params);
    App.channels.content.commands.trigger(commandName, this.viewClass, viewOptions);
  },

  getViewOptions: _.noop,

  onError(error) {
    throw new Error(error);
  }
});