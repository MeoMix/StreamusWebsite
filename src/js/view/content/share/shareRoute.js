define(function(require) {
  'use strict';

  var Route = require('route');
  var RouteType = require('enum/routeType');
  var ShareView = require('view/content/share/shareView');
  var ShareCode = require('model/content/shareCode');
  var Share = require('model/content/share');

  var ShareRoute = Route.extend({
    type: RouteType.Share,
    viewClass: ShareView,

    // The ShareView can be built by itself or with a information for showing a shareable entity.
    getViewOptions: function(routeDataParams) {
      var shareOptions = this._getShareOptions(routeDataParams);

      var viewOptions = {
        model: new Share(shareOptions)
      };

      return viewOptions;
    },

    _getShareOptions: function(routeDataParams) {
      var shareOptions = null;

      if (!_.isUndefined(routeDataParams.entityType)) {
        shareOptions = {
          shareCode: this._getShareCode(routeDataParams)
        };
      }

      return shareOptions;
    },

    _getShareCode: function(routeDataParams) {
      var shareCode = new ShareCode({
        entityType: routeDataParams.entityType,
        shortId: routeDataParams.shortId,
        urlFriendlyEntityTitle: routeDataParams.urlFriendlyEntityTitle,
      });

      return shareCode;
    }
  });

  return ShareRoute;
});