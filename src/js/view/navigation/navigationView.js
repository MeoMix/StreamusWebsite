define(function (require) {
    'use strict';

    var Route = require('enum/route');
    var NavigationItemView = require('view/navigation/navigationItemView');

    var NavigationView = Marionette.ItemView.extend({
        el: '#navigation',
        template: false,
        
        ui: {
            home: '#navigation-home',
            gettingStarted: '#navigation-gettingStarted',
            about: '#navigation-about',
            donate: '#navigation-donate'
        },
        
        onRender: function () {
            //  TODO: Stop relying on pages being a global so that this isnt' so weird.
            Streamus.pages.each(this._renderNavigationItem.bind(this));

            this.listenTo(Streamus.pages, 'add', this._renderNavigationItem);
        },

        _renderNavigationItem: function (page) {
            var navigationItem = this._getNavigationItem(page.get('route'));
            
            var navigationItemView = new NavigationItemView({
                el: navigationItem,
                model: page
            });
            navigationItemView.render();
        },
        
        _getNavigationItem: function (route) {
            var navigationItem = null;

            switch(route) {
                case Route.Home:
                    navigationItem = this.ui.home;
                    break;
                case Route.GettingStarted:
                    navigationItem = this.ui.gettingStarted;
                    break;
                case Route.About:
                    navigationItem = this.ui.about;
                    break;
                case Route.Donate:
                    navigationItem = this.ui.donate;
                    break;
            }

            return navigationItem;
        }
    });

    return NavigationView;
});