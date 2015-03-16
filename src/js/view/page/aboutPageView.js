define(function(require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var Routable = require('view/behavior/routable');

    var AboutPageView = Marionette.ItemView.extend({
        el: '.aboutPage',
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

    return AboutPageView;
});