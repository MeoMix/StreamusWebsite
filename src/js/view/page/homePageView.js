define(function (require) {
    'use strict';

    var Hidable = require('view/behavior/hidable');
    
    var HomePageView = Marionette.ItemView.extend({
        el: '#page-home',
        template: false,
        
        behaviors: {
            Hidable: {
                behaviorClass: Hidable
            }
        }
    });

    return HomePageView;
});