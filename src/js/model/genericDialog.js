define([
], function () {
    'use strict';

    var GenericDialog = Backbone.Model.extend({
        defaults: {
            title: '',
            //  Body is usually a Backbone.View
            body: null
        }
    });

    return GenericDialog;
});