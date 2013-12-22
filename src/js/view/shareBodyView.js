define([
    'view/socialView',
    'view/installButtonView',
    'view/footerView',
    'view/logoView'
], function (SocialView, InstallButtonView, FooterView, LogoView) {
    'use strict';

    var ShareBodyView = Backbone.View.extend({
        el: $('body'),

        installButton: new InstallButtonView(),
        socialView: new SocialView(),
        footerView: new FooterView(),
        logoView: new LogoView(),

        initialize: function () {
            this.$el.append(this.socialView.render().el);
            this.$el.removeClass('loading');            
        }

    });

    return new ShareBodyView();
});