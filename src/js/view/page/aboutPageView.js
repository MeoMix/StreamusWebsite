define(function (require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var Hidable = require('view/behavior/hidable');

    var AboutPageView = Marionette.ItemView.extend({
        el: '#page-about',
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

    return AboutPageView;
});