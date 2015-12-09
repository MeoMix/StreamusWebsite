import { LayoutView } from 'marionette';
import template from './navigation.hbs!';
import NavigationItems from './navigationItems';
import RouteType from 'common/enum/routeType';
import NavigationItemsView from './navigationItemsView';

export default LayoutView.extend({
  template,

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