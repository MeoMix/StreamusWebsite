define(function(require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var AboutTemplate = require('text!template/about.html');

    var AboutView = Marionette.ItemView.extend({
        template: _.template(AboutTemplate),

        behaviors: {
            LazyImages: {
                behaviorClass: LazyImages
            }
        }
    });

    return AboutView;
});