import { Collection } from 'backbone';
import NavigationItem from './navigationItem.js';
import RouteType from 'route/routeType.js';

export default Collection.extend({
  model: NavigationItem,

  initialize() {
    this.on('change:isActive', this._onChangeIsActive);
  },

  loadDefaults() {
    this.reset([{
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
    }, {
      text: 'Contact',
      route: RouteType.Contact,
      isSecondary: true
    }, {
      text: 'Terms of Use',
      route: RouteType.TermsOfUse,
      isSecondary: true
    }, {
      text: 'Privacy Policy',
      route: RouteType.PrivacyPolicy,
      isSecondary: true
    }]);
  },

  _onChangeIsActive(model, isActive) {
    if (isActive) {
      this._deactivateAllExcept(model);
    }
  },

  // Ensure only one model in the collection can be active at a time.
  _deactivateAllExcept(activeModel) {
    this.each((model) => {
      if (model !== activeModel) {
        model.set('isActive', false);
      }
    });
  }
});