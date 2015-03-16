define(function(require) {
    'use strict';

    var Routable = require('view/behavior/routable');

    var DonatePageView = Marionette.ItemView.extend({
        el: '.donatePage',
        template: false,

        behaviors: {
            Routable: {
                behaviorClass: Routable
            }
        }
    });

    return DonatePageView;
});