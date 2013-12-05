define([
    'text!template/navigation.htm'
], function (NavigationTemplate) {
    'use strict';

    var NavigationView = Backbone.View.extend({

        tagName: 'ul',

        className: 'nav nav-pills',

        template: _.template(NavigationTemplate),

        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return NavigationView;
});