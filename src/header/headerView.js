import { LayoutView } from 'marionette';
import template from './header.hbs!';
import styles from './header.css!';
import NavigationItemsView from 'navigationItems/navigationItemsView';

export default LayoutView.extend({
  className: styles.header,
  template,
  templateHelpers: {
    styles
  },

  regions: {
    navigationItems: 'navigationItems'
  },

  initialize() {
    this.listenTo(App.channels.window.vent, 'scroll', this._onWindowScroll);
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
    this.$el.toggleClass(styles.isFloating, eventData.scrollY > 0);
  }
});