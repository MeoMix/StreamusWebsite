define(function (require) {
    'use strict';

    var Routable = require('view/behavior/routable');
    
    var HomePageView = Marionette.ItemView.extend({
        el: '#page-home',
        template: false,
        
        behaviors: {
            Routable: {
                behaviorClass: Routable
            }
        }
    });

    return HomePageView;
});