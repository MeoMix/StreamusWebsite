import { View } from 'marionette';
import template from './footer.hbs';
import styles from './footer.css';
import RouteType from 'route/routeType.js';
import NavigationItemsView from 'navigationItems/navigationItemsView.js';

export default View.extend({
  className: styles.footer,
  template,
  templateContext: {
    styles,
    RouteType
  },

  regions: {
    navigationItems: 'navigationItems'
  },

  onRender() {
    this._renderNavigationItems();
  },

  _renderNavigationItems() {
    this.showChildView('navigationItems', new NavigationItemsView({
      collection: App.navigationItems,
      isSecondary: true
    }));
  }
});