define(function() {
    'use strict';

    //  Lazy load images which are not currently in the viewport to save on bandwidth.
    var LazyImages = Marionette.Behavior.extend({
        ui: {
            lazyImages: 'img[data-src]'
        },

        onRender: function() {
            //  Set image src 200px before they scroll into the viewport to give a chance to load.
            this.ui.lazyImages.unveil(200);
        }
    });

    return LazyImages;
});