define(function (require) {
    'use strict';

    var SocialView = require('view/socialView');
    var InstallButtonView = require('view/installButtonView');
    var FooterView = require('view/footerView');
    var LogoView = require('view/logoView');

    var ShareBodyView = Marionette.ItemView.extend({
        el: 'body',
        
        regions: {
            socialRegion: '#socialRegion'
        },
        
        initialize: function () {
            var installButtonView = new InstallButtonView();
            installButtonView.render();

            var footerView = new FooterView();
            footerView.render();

            var logoView = new LogoView();
            logoView.render();
            
            var socialView = new SocialView();
            this.socialRegion.show(socialView);

            this.$el.removeClass('is-loading');            
        }
    });

    return ShareBodyView;
});