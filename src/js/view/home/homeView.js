define(function(require) {
    'use strict';

    var InstallButton = require('model/installButton');
    var InstallButtonView = require('view/button/installButtonView');
    var HomeTemplate = require('text!template/home.html');

    var HomeView = Marionette.LayoutView.extend({
        template: _.template(HomeTemplate),

        regions: {
            buttonRegion: '.buttonRegion'
        },

        onRender: function() {
            this.buttonRegion.show(new InstallButtonView({
                model: new InstallButton()
            }));
        }
    });

    return HomeView;
});