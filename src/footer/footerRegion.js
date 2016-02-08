import { Region } from 'marionette';
import FooterView from './footerView.js';

export default Region.extend({
  initialize() {
    this.listenTo(App.channels.body.vent, 'rendered', this._onBodyRendered);
  },

  _onBodyRendered() {
    this.show(new FooterView());
  }
});