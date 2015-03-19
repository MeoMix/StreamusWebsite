define(function(require) {
    'use strict';

    var Route = require('route');
    var RouteType = require('enum/routeType');
    var ShareView = require('view/share/shareView');
    var ShareCode = require('model/shareCode');

    var ShareRoute = Route.extend({
        type: RouteType.Share,

        show: function(routeData) {
            Streamus.channels.body.commands.trigger('showIn:region', this._getShareView(routeData));
        },
        
        //  The ShareView can be constructed either by itself or with a ShareCode's information for showing a shareable entity to the user.
        _getShareView: function(routeData) {
            var shareView;

            if (!_.isUndefined(routeData.entityType)) {
                shareView = new ShareView({
                    shareCode: this._getShareCode(routeData)
                });
            } else {
                shareView = new ShareView();
            }

            return shareView;
        },

        _getShareCode: function(routeData) {
            var shareCode = new ShareCode({
                entityType: routeData.entityType,
                shortId: routeData.shortId,
                urlFriendlyEntityTitle: routeData.urlFriendlyEntityTitle,
            });

            return shareCode;
        }
    });

    return ShareRoute;
});