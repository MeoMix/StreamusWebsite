define([
    'text!../../template/homeContent.htm'
], function (HomeContentTemplate) {
    'use strict';

    var HomeContentView = Backbone.View.extend({

        className: 'content',

        template: _.template(HomeContentTemplate),

        attributes: {
            id: 'homeContent'
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return HomeContentView;
});