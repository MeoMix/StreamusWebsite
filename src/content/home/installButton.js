import { Model } from 'backbone';
import { result } from 'lodash';

export default Model.extend({
  defaults() {
    const isDisabled = !App.extension.get('canInstall');

    return {
      isDisabled,
      text: isDisabled ? App.extension.get('cantInstallReason') : 'Install'
    };
  },

  initialize() {
    this.listenTo(App.extension, {
      'change:canInstall': this._onExtensionChangeCanInstall,
      'change:isInstalled': this._onExtensionChangeIsInstalled
    });
  },

  install() {
    this.set('isDisabled', true);

    App.extension.install().catch(() => {
      this.reset();
    });
  },

  reset() {
    this.set(result(this, 'defaults'));
  },

  _onExtensionChangeCanInstall() {
    this.reset();
  },

  _onExtensionChangeIsInstalled() {
    this.reset();
  }
});