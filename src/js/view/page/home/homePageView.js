define(function(require) {
    'use strict';

    var Routable = require('view/behavior/routable');
    var InstallButton = require('model/installButton');
    var InstallButtonView = require('view/page/home/installButtonView');

    var HomePageView = Marionette.LayoutView.extend({
        el: '.homePage',
        template: false,

        behaviors: {
            Routable: {
                behaviorClass: Routable
            }
        },

        onRender: function() {
            var installButtonView = new InstallButtonView({
                model: new InstallButton()
            });
            installButtonView.render();
        }
    });

    return HomePageView;
});