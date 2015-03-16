define(function(require) {
    'use strict';

    var Routable = require('view/behavior/routable');

    var HomePageView = Marionette.ItemView.extend({
        el: '#homePage',
        template: false,

        behaviors: {
            Routable: {
                behaviorClass: Routable
            }
        }
    });

    return HomePageView;
});