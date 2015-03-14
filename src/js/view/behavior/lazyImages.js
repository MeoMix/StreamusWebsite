define(function () {
    'use strict';

    var LazyImages = Marionette.Behavior.extend({
        ui: {
            lazyImages: 'img[data-src]'
        },

        onRender: function () {
            //  TODO: Why does setting the value to 200px cause them all to load on gettingStarted?
            this.ui.lazyImages.unveil(200);
        }
    });

    return LazyImages;
});