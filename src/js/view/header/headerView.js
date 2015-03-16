define(function(require) {
    'use strict';

    var LogoView = require('view/header/logoView');
    var NavigationView = require('view/header/navigationView');

    var HeaderView = Marionette.LayoutView.extend({
        el: '.header',
        template: false,

        onRender: function() {
            var logoView = new LogoView();
            logoView.render();

            var navigationView = new NavigationView();
            navigationView.render();
        }
    });

    return HeaderView;
});