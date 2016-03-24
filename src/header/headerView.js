import { View } from 'marionette';
import template from './header.hbs';
import styles from './header.css';
import NavigationItemsView from 'navigationItems/navigationItemsView.js';

export default View.extend({
  className: styles.header,
  template,
  templateContext: {
    styles
  },

  regions: {
    navigationItems: 'navigationItems'
  },

  initialize() {
    this.listenTo(App.channels.window, 'scroll', this._onWindowScroll);
  },

  onRender() {
    this._renderNavigationItems();
  },

  _renderNavigationItems() {
    this.showChildView('navigationItems', new NavigationItemsView({
      collection: App.navigationItems,
      isHorizontal: true
    }));
  },

  _onWindowScroll(eventData) {
    this.el.classList.toggle(styles.isFloating, eventData.scrollY > 0);
  }
});