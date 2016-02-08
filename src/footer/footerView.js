import { LayoutView } from 'marionette';
import template from './footer.hbs';
import styles from './footer.css';
import RouteType from 'route/routeType.js';
import NavigationItemsView from 'navigationitems/navigationItemsView.js';

export default LayoutView.extend({
  className: styles.footer,
  template,
  templateHelpers: {
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