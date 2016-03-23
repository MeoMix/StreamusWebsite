import { Behavior } from 'marionette';
import { bindAll, defer} from 'lodash';

export default Behavior.extend({
  _cardCreated: false,
  _originalOnRender: null,

  initialize() {
    if (!window.CustomElements.hasNative) {
      defer(() => {
        // Bind pre-emptively to preserve function reference otherwise removeEventListener will fail.
        bindAll(this, '_onCardCreated');
        this.el.addEventListener('card:created', this._onCardCreated);
        this._originalOnRender = this.view.onRender;
        this.view.onRender = this._onRender();
      });
    }
  },
  
  onBeforeDestroy() {
    if (!window.CustomElements.hasNative) {
      this.el.removeEventListener('card:created', this._onCardCreated);
    }
  },

  _onRender() {
    if (window.CustomElements.hasNative || this._cardCreated) {
      this._originalOnRender.call(this.view, arguments);
    }
  },
  
  _onCardCreated(event) {
    // Webcomponent has modified DOM and so our ui/region references are stale.
    // If we haven't rendered yet then the view isn't stale.
    if (this.isRendered) {
      this._cardCreated = true;
      this.view.bindUIElements();
      this.view.regionManager.invoke('reset');
      this.view.triggerMethod('render', this);
    }

    // Only this view needs to respond to its template being stale.
    // Parent views should not be overreaching and accessing child view HTML.
    event.stopPropagation();
  }
});