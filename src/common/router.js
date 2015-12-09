import BaseRouter from 'backbone.base-router';
import Route from 'common/route';
import HomeRoute from 'content/home/homeRoute';
import FaqRoute from 'content/faq/faqRoute';
import GettingStartedRoute from 'content/gettingStarted/gettingStartedRoute';
import ShareRoute from 'content/share/shareRoute';
import AboutRoute from 'content/about/aboutRoute';
import DonateRoute from 'content/donate/donateRoute';
import NotFoundRoute from 'content/notFound/notFoundRoute';
import _ from 'lodash';

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
      [`${FaqRoute.prototype.type}/:activeSubjectId`]: new FaqRoute(),
      [ShareRoute.prototype.type]: new ShareRoute(),
      [`${ShareRoute.prototype.type}/:entityType/:shortId`]: new ShareRoute(),
      [`${ShareRoute.prototype.type}/:entityType/:shortId/:urlFriendlyEntityTitle`]: new ShareRoute(),
      [AboutRoute.prototype.type]: new AboutRoute(),
      [DonateRoute.prototype.type]: new DonateRoute(),
      [NotFoundRoute.prototype.type]: new NotFoundRoute()
    };

    // Ensure that trailing slash on all routes is optional.
    routes = _.mapKeys(routes, function(value, key) {
      return key + '(/)';
    });

    return routes;
  }
});