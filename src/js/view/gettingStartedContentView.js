define([
    'text!../template/gettingStartedContent.htm'
], function (GettingStartedContentTemplate) {
    'use strict';

    var GettingStartedContentView = Backbone.View.extend({

        className: 'content',

        template: _.template(GettingStartedContentTemplate),

        attributes: {
            id: 'gettingStartedContent'
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return GettingStartedContentView;
});