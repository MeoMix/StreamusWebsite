import { Region } from 'marionette';
import NavigationDrawerView from './navigationDrawerView.js';

export default Region.extend({
  initialize() {
    this.listenTo(App.channels.body.vent, 'rendered', this._onBodyRendered);
  },

  _onBodyRendered() {
    this.show(new NavigationDrawerView());
  }
});