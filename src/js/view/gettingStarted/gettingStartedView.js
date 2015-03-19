define(function(require) {
    'use strict';

    var LazyImages = require('view/behavior/lazyImages');
    var GettingStartedTemplate = require('text!template/gettingStarted.html');

    var GettingStartedView = Marionette.ItemView.extend({
        template: _.template(GettingStartedTemplate),

        behaviors: {
            LazyImages: {
                behaviorClass: LazyImages
            }
        }
    });

    return GettingStartedView;
});