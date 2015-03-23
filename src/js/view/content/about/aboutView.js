define(function(require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var AboutTemplate = require('text!template/content/about.html');

    var AboutView = Marionette.LayoutView.extend({
        className: 'about content',
        template: _.template(AboutTemplate),

        behaviors: {
            LazyImages: {
                behaviorClass: LazyImages
            }
        }
    });

    return AboutView;
});