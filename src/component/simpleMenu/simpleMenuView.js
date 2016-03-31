import { View } from 'marionette';
import template from './simpleMenu.hbs';
import styles from './simpleMenu.css';
import SimpleMenuItemsView from './simpleMenuItemsView.js';
import { defer, parseInt } from 'lodash';

export default View.extend({
  className: styles.simpleMenu,
  template,
  templateContext: {
    styles
  },

  regions: {
    simpleMenuItems: 'simpleMenuItems'
  },

  ui: {
    content: 'content'
  },

  initialize() {
    // Defer binding event listeners which will hide this view to ensure that events which
    // were responsible for showing it do not also result in hiding.
    defer(() => {
      if (!this.isDestroyed()) {
        this.listenTo(App.channels.element, 'click', this._onElementClick);
      }
    });
  },

  onRender() {
    this.showChildView('simpleMenuItems', new SimpleMenuItemsView({
      collection: this.model.get('simpleMenuItems'),
      listItemHeight: this.model.get('listItemHeight')
    }));
  },

  onAttach() {
    // Call ensureActiveIsVisible from parent because _centerActive depends on simpleMenuItems' scrollTop.
    this.getChildView('simpleMenuItems').ensureActiveIsVisible();
    this._centerActive(this.model.get('listItemHeight'));

    this.el.classList.add(styles.isVisible);
  },

  hide() {
    this.ui.content
      .off('transitionend.transitionOut')
      .on('transitionend.transitionOut', this._onTransitionOutComplete.bind(this));
    this.el.classList.remove(styles.isVisible);
  },

  _onTransitionOutComplete() {
    this.destroy();
  },

  _onElementClick() {
    this.hide();
  },

  // This needs to take into account overflow. If overflowing, abandon trying to center and keep within the viewport.
  // https://github.com/MeoMix/StreamusChromeExtension/issues/566
  // When showing this view over a ListItem, center the view's active item over the ListItem.
  _centerActive(listItemHeight) {
    if (listItemHeight > 0) {
      const offsetData = this.getChildView('simpleMenuItems').getActiveItemOffsetData();
      // Center the offset over the listItem using logic outlined in Material guidelines
      // http://www.google.com/design/spec/components/menus.html#menus-simple-menus
      const paddingTop = parseInt(this.ui.content.css('padding-top'));
      const centering = (listItemHeight - offsetData.itemHeight) / 2 - paddingTop;
      // Be sure to round because sub-pixel positioning can cause blur.
      const offsetTop = Math.round(offsetData.itemOffset + centering);

      this.$el.css('transform', `translate(${this.model.get('offsetLeft')}px, ${offsetTop}px)`);
      this.model.set('offsetTop:', offsetTop);
    }
  }
});