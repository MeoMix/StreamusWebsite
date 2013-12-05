define([
    'text!template/aboutContent.htm'
], function (AboutContentTemplate) {
    'use strict';

    var AboutContentView = Backbone.View.extend({

        className: 'content',

        template: _.template(AboutContentTemplate),

        attributes: {
            id: 'aboutContent'
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AboutContentView;
});