import { View } from 'marionette';
import template from './simpleMenu.hbs';
import styles from './simpleMenu.css';
import SimpleMenuItemsView from './simpleMenuItemsView.js';
import SimpleMenuItemView from './simpleMenuItemView.js';
import FixedPosition from './fixedPosition.js';
import Utility from 'common/utility.js';
import { defer } from 'lodash';

export default View.extend({
  className: styles.simpleMenu,
  template,
  templateContext: {
    styles
  },

  regions: {
    simpleMenuItems: 'simpleMenuItems',
    fixedTopMenuItem: 'fixedTopMenuItem',
    fixedBottomMenuItem: 'fixedBottomMenuItem'
  },

  ui: {
    panelContent: 'panelContent'
  },

  childEvents: {
    'click:item': '_onClickItem'
  },

  initialize() {
    // Defer binding event listeners which will hide this view to ensure that events which
    // were responsible for showing it do not also result in hiding.
    defer(() => {
      if (!this.isDestroyed) {
        this.listenTo(App.channels.element, 'click', this._onElementClick);
      }
    });
  },

  onRender() {
    this.showChildView('simpleMenuItems', new SimpleMenuItemsView({
      collection: this.model.get('simpleMenuItems'),
      listItemHeight: this.model.get('listItemHeight')
    }));

    const fixedMenuItem = this.model.get('fixedMenuItem');
    if (fixedMenuItem) {
      this._showFixedMenuItem(fixedMenuItem);
    }
  },

  onAttach() {
    if (this.model.get('reposition')) {
      this._setPosition(this.model.get('repositionData'));
    }

    // Call ensureActiveIsVisible from parent because _centerActive depends on simpleMenuItems' scrollTop.
    this.getChildView('simpleMenuItems').ensureActiveIsVisible();
    this._centerActive(this.model.get('listItemHeight'));

    this.el.classList.add(styles.isVisible);
  },

  hide() {
    this.ui.panelContent
      .off('webkitTransitionEnd.transitionOut')
      .on('webkitTransitionEnd.transitionOut', this._onTransitionOutComplete.bind(this));
    this.el.classList.remove(styles.isVisible);
  },

  _onClickItem() {
    this.hide();
  },

  _onTransitionOutComplete() {
    this.destroy();
  },

  _onElementClick(event) {
    // These targets can show up when dragging the scrollbar and it's weird to close when interacting with scrollbar.
    if (event.target !== this.getRegion('simpleMenuItems').el) {
      this.hide();
    }
  },

  // Renders a SimpleMenuItem in a fixed location either above or below the collection of other items.
  _showFixedMenuItem(fixedMenuItem) {
    const fixedPosition = fixedMenuItem.get('fixedPosition');

    if (fixedPosition === FixedPosition.Top) {
      this.showChildView('fixedTopMenuItem', new SimpleMenuItemView({
        model: fixedMenuItem
      }));
    } else if (fixedPosition === FixedPosition.Bottom) {
      this.showChildView('fixedBottomMenuItem', new SimpleMenuItemView({
        model: fixedMenuItem
      }));
    }
  },

  _setPosition(positionData) {
    // Prefer flipping, but if flipping won't fit in the viewport then settle for shifting.
    let offsetTop = Utility.flipInvertOffset(positionData.top, this.$el.outerHeight(), positionData.containerHeight);
    if (offsetTop < 0) {
      offsetTop = Utility.shiftOffset(positionData.top, this.$el.outerHeight(), positionData.containerHeight, 8);
    }

    let offsetLeft = Utility.flipInvertOffset(positionData.left, this.$el.outerWidth(), positionData.containerWidth);
    if (offsetLeft < 0) {
      offsetLeft = Utility.shiftOffset(positionData.left, this.$el.outerWidth, positionData.containerWidth, 8);
    }

    // Be sure to round the values because sub-pixel positioning of view can cause blur.
    offsetTop = Math.round(offsetTop);
    offsetLeft = Math.round(offsetLeft);

    this.$el.css('transform', `translate(${offsetLeft}px, ${offsetTop}px)`);
    this.model.set({
      offsetTop,
      offsetLeft
    });
  },

  // This needs to take into account overflow. If overflowing, abandon trying to center and keep within the viewport.
  // https://github.com/MeoMix/StreamusChromeExtension/issues/566
  // When showing this view over a ListItem, center the view's active item over the ListItem.
  _centerActive(listItemHeight) {
    if (listItemHeight > 0) {
      const offsetData = this.getChildView('simpleMenuItems').getActiveItemOffsetData();
      // Center the offset over the listItem using logic outlined in Material guidelines
      // http://www.google.com/design/spec/components/menus.html#menus-simple-menus
      const paddingTop = parseInt(this.ui.panelContent.css('padding-top'), 10);
      const centering = (listItemHeight - offsetData.itemHeight) / 2 - paddingTop;
      // Be sure to round because sub-pixel positioning can cause blur.
      const offsetTop = Math.round(offsetData.itemOffset + centering);

      this.$el.css('transform', `translate(${this.model.get('offsetLeft')}px, ${offsetTop}px)`);
      this.model.set('offsetTop:', offsetTop);
    }
  }
});