define([
], function () {
    'use strict';

    var ContentPage = Backbone.Model.extend({
        defaults: {
            route: '',
            hidden: true
        }
    });

    return ContentPage;
});