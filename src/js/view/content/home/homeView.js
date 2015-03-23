define(function(require) {
    'use strict';

    var InstallButton = require('model/button/installButton');
    var InstallButtonView = require('view/button/installButtonView');
    var HomeTemplate = require('text!template/content/home.html');

    var HomeView = Marionette.LayoutView.extend({
        className: 'home content',
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