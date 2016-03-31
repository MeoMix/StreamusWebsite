import BaseRouter from 'backbone.base-router';
import Route from 'route/route.js';
import HomeRoute from 'content/home/homeRoute.js';
import FaqRoute from 'content/faq/faqRoute.js';
import GettingStartedRoute from 'content/gettingStarted/gettingStartedRoute.js';
import ShareRoute from 'content/share/shareRoute.js';
import AboutRoute from 'content/about/aboutRoute.js';
import DonateRoute from 'content/donate/donateRoute.js';
import ContactRoute from 'content/contact/contactRoute.js';
import PrivacyPolicyRoute from 'content/privacyPolicy/privacyPolicyRoute.js';
import TermsOfUseRoute from 'content/termsOfUse/termsOfUseRoute.js';
import NotFoundRoute from 'content/notFound/notFoundRoute.js';
import { mapKeys } from 'lodash';

export default BaseRouter.extend({
  onNavigate(routeData) {
    const newRoute = routeData.linked;

    if (!(newRoute instanceof Route)) {
      throw new Error('A Route object must be associated with each route.');
    }

    newRoute.show(routeData);
    App.channels.route.trigger('shown', newRoute.type, routeData);
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