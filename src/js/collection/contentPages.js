define([
    'model/contentPage'
], function (ContentPage) {
    'use strict';

    var ContentPageCollection = Backbone.Collection.extend({
        model: ContentPage
    });

    return new ContentPageCollection();
});