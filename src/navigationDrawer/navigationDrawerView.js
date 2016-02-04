import { LayoutView } from 'marionette';
import template from './navigationDrawer.hbs!';
import styles from './navigationDrawer.css!';
import NavigationItems from 'navigationItems/navigationItems';
import RouteType from 'route/routeType';
import NavigationItemsView from 'navigationItems/navigationItemsView';

export default LayoutView.extend({
  className: styles.navigationDrawer,
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
    const navigationItems = new NavigationItems([{
      text: 'Home',
      route: RouteType.Home
    }, {
      text: 'Getting Started',
      route: RouteType.GettingStarted
    }, {
      text: 'FAQ',
      route: RouteType.Faq
    }, {
      text: 'Share',
      route: RouteType.Share
    }, {
      text: 'About',
      route: RouteType.About
    }, {
      text: 'Donate',
      route: RouteType.Donate
    }]);

    this.showChildView('navigationItems', new NavigationItemsView({
      collection: navigationItems
    }));
  }
});