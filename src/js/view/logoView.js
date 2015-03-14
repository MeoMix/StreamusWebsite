define(function (require) {
    'use strict';

    var Route = require('enum/route');

    var LogoView = Marionette.ItemView.extend({
        el: '#logo',
        template: false,
        
        events: {
            'click': '_onClick'
        },
        
        _onClick: function () {
            this._navigateHome();
        },
        
        //  If the user has clicked the logo and is viewing the share.streamus sub-domain, go back to the root domain.
        //  Otherwise just route as normal.
        _navigateHome: function () {
            //  TODO: I don't think this is right.
            if (window.location.host === 'share.streamus.com') {
                document.location.href = 'http://streamus.com';
            } else {
                Streamus.router.navigate(Route.Home, { trigger: true });
            }
        }
    });

    return LogoView;
});