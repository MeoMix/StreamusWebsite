import BaseRouter from 'backbone.base-router';
import Route from 'route/route.js';
import HomeRoute from 'contentPages/home/homeRoute.js';
import FaqRoute from 'contentPages/faq/faqRoute.js';
import GettingStartedRoute from 'contentPages/gettingStarted/gettingStartedRoute.js';
import ShareRoute from 'contentPages/share/shareRoute.js';
import AboutRoute from 'contentPages/about/aboutRoute.js';
import DonateRoute from 'contentPages/donate/donateRoute.js';
import ContactRoute from 'contentPages/contact/contactRoute.js';
import PrivacyPolicyRoute from 'contentPages/privacyPolicy/privacyPolicyRoute.js';
import TermsOfUseRoute from 'contentPages/termsOfUse/termsOfUseRoute.js';
import NotFoundRoute from 'contentPages/notFound/notFoundRoute.js';
import { mapKeys } from 'lodash';

export default BaseRouter.extend({
  onNavigate(routeData) {
    const newRoute = routeData.linked;

    if (!(newRoute instanceof Route)) {
      throw new Error('A Route object must be associated with each route.');
    }

    newRoute.show(routeData);
    App.channels.route.vent.trigger('shown', newRoute.type, routeData);
    App.analyticsManager.sendPageView();
  },

  routes() {
    let routes = {
      [HomeRoute.prototype.type]: new HomeRoute(),
      [GettingStartedRoute.prototype.type]: new GettingStartedRoute(),
      [FaqRoute.prototype.type]: new FaqRoute(),
      [`${FaqRoute.prototype.type}/:initialActiveItemId`]: new FaqRoute(),
      [ShareRoute.prototype.type]: new ShareRoute(),
      [`${ShareRoute.prototype.type}/:entityType/:shortId`]: new ShareRoute(),
      [`${ShareRoute.prototype.type}/:entityType/:shortId/:urlFriendlyEntityTitle`]: new ShareRoute(),
      [AboutRoute.prototype.type]: new AboutRoute(),
      [DonateRoute.prototype.type]: new DonateRoute(),
      [ContactRoute.prototype.type]: new ContactRoute(),
      [PrivacyPolicyRoute.prototype.type]: new PrivacyPolicyRoute(),
      [TermsOfUseRoute.prototype.type]: new TermsOfUseRoute(),
      [NotFoundRoute.prototype.type]: new NotFoundRoute()
    };

    // Ensure that trailing slash on all routes is optional.
    routes = mapKeys(routes, (value, key) => {
      return `${key}(/)`;
    });

    return routes;
  }
});