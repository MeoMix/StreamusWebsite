import { Region } from 'marionette';
import SnackbarView from './snackbarView.js';
import Snackbar from './snackbar.js';
import Snackbars from './snackbars.js';

export default Region.extend({
  _snackbarQueue: null,

  initialize() {
    this._snackbarQueue = new Snackbars();
    this.listenTo(App.channels.snackbar, 'show:snackbar', this._showSnackbar);
  },

  onEmpty() {
    // Wait for browser to acknowledge previous view has been removed from the DOM.
    // Without RAF the new snackbar will instantly appear rather than transition in.
    requestAnimationFrame(() => {
      const queuedSnackbar = this._snackbarQueue.shift();

      if (queuedSnackbar) {
        this.show(new SnackbarView({
          model: queuedSnackbar
        }));
      }
    });
  },

  _showSnackbar(snackbarOptions) {
    const snackbar = new Snackbar(snackbarOptions);

    // Ensure each snackbar is given its full amount of time to display, but
    // also ensure only one snackbar is visible at a time.
    if (this.hasView()) {
      this._snackbarQueue.add(snackbar);
      this.currentView.hide();
    } else {
      this.show(new SnackbarView({
        model: snackbar
      }));
    }
  }
});