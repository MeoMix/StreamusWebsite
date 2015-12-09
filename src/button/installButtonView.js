import { LayoutView } from 'marionette';
import Button from 'behavior/button';

export default LayoutView.extend({
  tagName: 'a',
  className: 'installButton btn btn-lg btn-success',
  template: false,

  behaviors: {
    Button: {
      behaviorClass: Button
    }
  },

  initialize() {
    this.listenTo(App.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
  },

  onClick() {
    this.model.install();
  },

  _onExtensionDataChangeInstalled(model, installed) {
    this.model.setInstalledState(installed);
  }
});