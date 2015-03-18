define(function(require) {
    'use strict';

    var Routable = require('view/behavior/routable');
    var InstallButton = require('model/installButton');
    var InstallButtonView = require('view/button/installButtonView');

    var HomePageView = Marionette.LayoutView.extend({
        el: '.homePage',
        template: false,
        
        regions: {
            buttonRegion: '.buttonRegion'
        },

        behaviors: {
            Routable: {
                behaviorClass: Routable
            }
        },

        onRender: function() {
            this.buttonRegion.show(new InstallButtonView({
                model: new InstallButton()
            }));
        }
    });

    return HomePageView;
});