define(function(require) {
    'use strict';

    var NavigationItemView = require('view/header/navigationItemView');

    var NavigationView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'navigation nav nav-pills',
        template: false,
        childView: NavigationItemView
    });

    return NavigationView;
});