import { Behavior } from 'marionette';
import { bindAll, debounce} from 'lodash';

export default Behavior.extend({
  _customElementCreated: false,
  _originalViewInitialize: null,
  _originalViewOnRender: null,

  initialize() {
    if (!window.CustomElements.hasNative) {
      // Bind pre-emptively to preserve function reference otherwise removeEventListener will fail.
      bindAll(this, '_onCustomElementCreated');

      // There can be multiple webcomponents which will all emit events. Don't spam reinitialize the view.
      this._reinitializeView = debounce(this._reinitializeView.bind(this), 100);

      this._originalViewInitialize = this.view.initialize;
      this._originalViewOnRender = this.view.onRender;
      this.view.initialize = this._viewInitialize.bind(this);
      this.view.onRender = this._onViewRender.bind(this);
    }
  },
  
  onBeforeDestroy() {
    if (!window.CustomElements.hasNative) {
      this.el.removeEventListener('customElement:created', this._onCustomElementCreated);
    }
  },

  _viewInitialize() {
    this.el.addEventListener('customElement:created', this._onCustomElementCreated);

    if (this._originalViewInitialize) {
      this._originalViewInitialize.call(this.view, arguments);
    }
  },

  _onViewRender() {
    if (window.CustomElements.hasNative || this._customElementCreated) {
      if (this._originalViewOnRender) {
        this._originalViewOnRender.call(this.view, arguments);
      }
    }
  },
  
  _onCustomElementCreated(event) {
    // Webcomponent has modified DOM and so our ui/region references are stale.
    // If we haven't rendered yet then the view isn't stale.
    if (this.view.isRendered) {
      this._reinitializeView();
    }

    // Only this view needs to respond to its template being stale.
    // Parent views should not be overreaching and accessing child view HTML.
    event.stopPropagation();
  },

  _reinitializeView() {
    this._customElementCreated = true;
    this.view.bindUIElements();
    this.view._reInitRegions();
    this.view.triggerMethod('render', this.view);
  }
});