define(function(require) {
  'use strict';

  var Route = require('route');
  var RouteType = require('enum/routeType');
  var FaqView = require('view/content/faq/faqView');
  var Faq = require('model/content/faq');

  var FaqRoute = Route.extend({
    type: RouteType.Faq,
    viewClass: FaqView,

    // FAQ can either load at the top or focus a specific subject in the view upon instantiation.
    getViewOptions: function(routeDataParams) {
      var faqOptions = this._getFaqOptions(routeDataParams);

      var viewOptions = {
        model: new Faq(faqOptions)
      };

      return viewOptions;
    },

    _getFaqOptions: function(routeDataParams) {
      var faqOptions = null;

      if (!_.isUndefined(routeDataParams.activeSubjectId)) {
        faqOptions = {
          activeSubjectId: routeDataParams.activeSubjectId
        };
      }

      return faqOptions;
    }
  });

  return FaqRoute;
});