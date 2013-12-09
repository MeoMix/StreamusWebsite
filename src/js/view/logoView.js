define([
    'enum/route'
], function (Route) {
    'use strict';

    var LogoView = Backbone.View.extend({

        events: {
            'click': 'navigateHome'
        },
        
        initialize: function () {
            this.$el.data('route', Route.Home);
        },
        
        //  If the user has clicked the logo and is viewing the share.streamus sub-domain, go back to the root domain.
        //  Otherwise just route as normal.
        navigateHome: function () {
            
            if (window.location.host === 'share.streamus.com') {
                document.location.href = 'http://streamus.com';
            }

        }

    });

    return LogoView;
});