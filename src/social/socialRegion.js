import { Region } from 'marionette';
import SocialView from './socialView';

export default Region.extend({
  initialize() {
    this.listenTo(App.channels.body.vent, 'rendered', this._onBodyRendered);
  },

  _onBodyRendered() {
    this.show(new SocialView());
  }
});