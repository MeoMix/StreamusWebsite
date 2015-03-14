define(function (require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var Hidable = require('view/behavior/hidable');

    var GettingStartedPageView = Marionette.ItemView.extend({
        el: '#page-gettingStarted',
        template: false,
        
        behaviors: {
            LazyImages: {
                behaviorClass: LazyImages
            },
            Hidable: {
                behaviorClass: Hidable
            }
        }
    });

    return GettingStartedPageView;
});