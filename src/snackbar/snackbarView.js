import { View } from 'marionette';
import template from './snackbar.hbs';
import styles from './snackbar.css';
import { defer } from 'lodash';

export default View.extend({
  className: styles.snackbar,
  template,
  templateContext: {
    styles
  },

  modelEvents: {
    'change:isFullyVisible': '_onChangeIsFullyVisible'
  },

  _hideTimeout: null,
  // The default timeout delay for hiding the snackbar given no outside influences.
  _hideTimeoutDelay: 3000,
  // The time in which the snackbar became fully visible.
  _fullyVisibleTime: null,
  // Ensure snackbars are given some time to be read before replaced with next snackbar.
  _minDisplayTime: 500,

  initialize() {
    // Defer binding event listeners which will hide this view to ensure that events which
    // were responsible for showing it do not also result in hiding.
    defer(() => {
      if (!this.isDestroyed()) {
        this.listenTo(App.channels.element, 'click', this._onElementClick);
      }
    });
  },

  onAttach() {
    this._setHideTimeout(this._hideTimeoutDelay);
    // Wait for browser to acknowledge element is part of DOM to ensure transition occurs.
    requestAnimationFrame(() => this._transitionIn());
  },

  onBeforeDestroy() {
    this._clearHideTimeout();
  },

  hide(enforceMinDisplayTime = true) {
    this._clearHideTimeout();

    // Ensure the snackbar is fully visible momentarily before allowing it to be hidden.
    // This allows a second snackbar to be shown quickly without the first stuttering in/out.
    if (this.model.get('isFullyVisible')) {
      // Don't let the current snackbar get hidden before the user has a chance to read it.
      const currentDisplayTime = performance.now() - this._fullyVisibleTime;
      const remainingDisplayTime = this._minDisplayTime - currentDisplayTime;

      if (enforceMinDisplayTime && remainingDisplayTime > 0) {
        this._setHideTimeout(remainingDisplayTime);
      } else {
        this._transitionOut();
      }
    } else {
      this.model.set('hasHidePending', true);
    }
  },

  _onElementClick() {
    if (this.model.get('isFullyVisible')) {
      // User interactions should cause UI to respond immediately.
      this.hide(false);
    }
  },

  _onTransitionInComplete(event) {
    // TransitionEnd events bubble up from children. Only respond to the expected event.
    if (event.target === event.currentTarget) {
      this.$el.off('transitionend.transitionIn');
      this.model.set('isFullyVisible', true);
    }
  },

  _onTransitionOutComplete(event) {
    // TransitionEnd events bubble up from children. Only respond to the expected event.
    if (event.target === event.currentTarget) {
      this.$el.off('transitionend.transitionOut');
      this.destroy();
    }
  },

  _onChangeIsFullyVisible(model, isFullyVisible) {
    if (isFullyVisible) {
      this._fullyVisibleTime = performance.now();

      if (model.get('hasHidePending')) {
        this._clearHideTimeout();
        this._setHideTimeout(this._minDisplayTime);
      }
    }
  },

  _setHideTimeout(delay) {
    this._hideTimeout = setTimeout(() => this.hide(), delay);
  },

  _clearHideTimeout() {
    clearTimeout(this._hideTimeout);
  },

  // Slide the snackbar up and into the viewport.
  _transitionIn() {
    this.$el
      .off('transitionend.transitionIn')
      .on('transitionend.transitionIn', this._onTransitionInComplete.bind(this));
    this.el.classList.add(styles.isVisible);
  },

  // Slide snackbar down and out of the viewport. Destroy the view once it is fully hidden.
  _transitionOut() {
    this.$el
      .off('transitionend.transitionOut')
      .on('transitionend.transitionOut', this._onTransitionOutComplete.bind(this));
    this.el.classList.remove(styles.isVisible);
    this.model.set('isFullyVisible', false);
  }
});