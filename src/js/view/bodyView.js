//  TODO: BodyView loads the HTML for share.streamus and streamus.com irregardless of which is requested -- need to fix.
define([
    'contentRouter',
    'view/navigationView',
    'view/homeContentView',
    'view/gettingStartedContentView',
    'view/aboutContentView',
    'view/donateContentView',
    'view/socialView',
    'view/installButtonView',
    'view/footerView',
    'view/logoView'
], function (ContentRouter, NavigationView, HomeContentView, GettingStartedContentView, AboutContentView, DonateContentView, SocialView, InstallButtonView, FooterView, LogoView) {
    'use strict';

    var BodyView = Backbone.View.extend({
        el: $('body'),

        events: {
            'click *[data-route]': 'navigateToRoute'
        },

        navigationView: new NavigationView(),
        homeView: new HomeContentView(),
        gettingStartedView: new GettingStartedContentView(),
        aboutView: new AboutContentView(),
        donateView: new DonateContentView(),
        installButton: new InstallButtonView(),
        socialView: new SocialView(),
        footerView: new FooterView(),
        logoView: new LogoView(),
        //  Setup the content router once all of the pages have added themselves to contentPages.
        contentRouter: null,

        initialize: function () {

            this.contentRouter = new ContentRouter();
            
            this.$el.append(this.socialView.render().el);
            this.$el.removeClass('loading');            
        },

        //  Enable keeping track of the current content shown without affecting history and without actually changing the page.
        navigateToRoute: function (event) {
            var route = $(event.currentTarget).data('route');
            this.contentRouter.navigate(route, { trigger: true });
        }

    });

    return new BodyView();
});