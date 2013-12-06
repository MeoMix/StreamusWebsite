define([
    'collection/contentPages'
], function (ContentPages) {
    'use strict';

    var GenericContentView = Backbone.View.extend({
        
        lazyImages: [],
        
        initialize: function () {
            
            ContentPages.add(this.model);

            if (this.lazyImages.length > 0) {
                this.lazyImages.unveil(200);
            }

            this.listenTo(this.model, 'change:hidden', function (model, hidden) {

                if (hidden) {
                    this.hide();
                } else {
                    this.show();
                }

            });

        },

        show: function () {

            this.$el.show();
            
            if (this.lazyImages.length > 0) {
                this.lazyImages.trigger('unveil');
            }

        },

        hide: function() {
            this.$el.hide();
        }

    });

    return GenericContentView;
});