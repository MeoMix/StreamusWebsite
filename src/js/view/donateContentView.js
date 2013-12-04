define([
    'text!../template/donateContent.htm'
], function (DonateContentTemplate) {
    'use strict';

    var AboutContentView = Backbone.View.extend({

        className: 'content',

        template: _.template(DonateContentTemplate),

        attributes: {
            id: 'donateContent'
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return AboutContentView;
});