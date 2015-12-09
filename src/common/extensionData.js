import { Model } from 'backbone';
import _ from 'lodash';

export default Model.extend({
  defaults: {
    id: null,
    chromeId: 'jbnkffmindojffecdhbbmekbmkkfpmjd',
    operaId: 'nnmcpagedcgekmljdamaeahfbmmjloho',
    installed: false,
    isUserLoaded: false,
    pollAttemptCount: 0,
    maxPollAttemptCount: 10,
    // How often to poll the extension in ms
    pollInterval: 500,

    browser: null
  },

  initialize() {
    this.on('change:installed', this._onChangeInstalled);

    if (!this.get('browser').get('isMobile')) {
      this.set('id', this._getExtensionId());
      this._setIsInstalled();
    }
  },

  // Called once an installation has successfully occurred.
  markAsInstalled() {
    this.set('installed', true);
  },

  _onChangeInstalled(model, installed) {
    if (installed) {
      if (this.get('pollAttemptCount') === 0) {
        this._pollForUserLoaded();
      }
    } else {
      this.set('isUserLoaded', false);
    }
  },

  // It's not possible to have the extension notify the website of when the user is successfully loaded
  // without adding additional permissions. So, long poll the extension until it indicates that the user is ready.
  _pollForUserLoaded() {
    const pollAttemptCount = this.get('pollAttemptCount');

    if (pollAttemptCount < this.get('maxPollAttemptCount')) {
      this.set('pollAttemptCount', pollAttemptCount + 1);

      window.chrome.runtime.sendMessage(this.get('id'), {
        method: 'isUserLoaded'
      }, (response) => {
        if (response && response.isUserLoaded) {
          this.set('isUserLoaded', true);
          this.set('pollAttemptCount', 0);
        } else {
          setTimeout(this._pollForUserLoaded.bind(this), 500);
        }
      });
    } else {
      this.set('pollAttemptCount', 0);
    }
  },

  _getExtensionId() {
    let extensionId = null;
    const browser = this.get('browser');

    if (browser.get('isChrome')) {
      extensionId = this.get('chromeId');
    } else if (browser.get('isOpera')) {
      extensionId = this.get('operaId');
    }

    return extensionId;
  },

  // Attempt to ping Streamus Chrome Extension. If a response is received then it is known to be installed.
  _setIsInstalled() {
    const extensionId = this.get('id');

    if (extensionId !== null) {
      // Opera doesn't have chrome.runtime defined until an extension is installed. Weird.
      if (_.isUndefined(window.chrome.runtime)) {
        this.set('installed', false);
      } else {
        window.chrome.runtime.sendMessage(extensionId, {
          message: 'isInstalled'
        }, (response) => {
          this.set('installed', response && response.isInstalled);
        });
      }
    }
  }
});