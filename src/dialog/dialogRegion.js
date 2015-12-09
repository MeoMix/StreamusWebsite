import { Region } from 'marionette';

export default Region.extend({
  initialize() {
    this.listenTo(App.channels.dialog.commands, 'show:dialog', this._showDialog);
  },

  _showDialog(DialogView) {
    this.show(new DialogView());
  }
});