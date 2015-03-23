define(function(require) {
    'use strict';
    
    var NavigationItemView = require('view/header/navigationItemView');

    var NavigationItemsView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'navigation nav navbar-nav',
        template: false,
        childView: NavigationItemView
    });

    return NavigationItemsView;
});