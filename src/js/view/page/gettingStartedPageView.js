define(function (require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var Routable = require('view/behavior/routable');

    var GettingStartedPageView = Marionette.ItemView.extend({
        el: '#page-gettingStarted',
        template: false,
        
        behaviors: {
            LazyImages: {
                behaviorClass: LazyImages
            },
            Routable: {
                behaviorClass: Routable
            }
        }
    });

    return GettingStartedPageView;
});