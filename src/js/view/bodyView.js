define(function(require) {
    'use strict';

    var Page = require('model/page');
    var InstallButton = require('model/installButton');
    var Route = require('enum/route');
    var NavigationView = require('view/navigation/navigationView');
    var HomePageView = require('view/page/homePageView');
    var GettingStartedPageView = require('view/page/gettingStartedPageView');
    var AboutPageView = require('view/page/aboutPageView');
    var DonatePageView = require('view/page/donatePageView');
    var SharePageView = require('view/page/sharePageView');
    var SocialView = require('view/socialView');
    var InstallButtonView = require('view/installButtonView');
    var FooterView = require('view/footerView');
    var LogoView = require('view/logoView');
    var DialogRegion = require('view/dialog/dialogRegion');

    var BodyView = Marionette.LayoutView.extend({
        el: 'body',
        template: false,

        events: {
            'click *[data-route]': 'navigateToRoute'
        },

        regions: {
            socialRegion: '.socialRegion',
            dialogRegion: {
                selector: '.dialogRegion',
                regionClass: DialogRegion
            }
        },

        onRender: function() {
            var navigationView = new NavigationView();
            navigationView.render();

            var installButtonView = new InstallButtonView({
                model: new InstallButton()
            });
            installButtonView.render();

            var footerView = new FooterView();
            footerView.render();

            var logoView = new LogoView();
            logoView.render();

            this.socialRegion.show(new SocialView());

            var homePageView = new HomePageView({
                model: new Page({
                    route: Route.Home
                })
            });
            homePageView.render();

            var gettingStartedPageView = new GettingStartedPageView({
                model: new Page({
                    route: Route.GettingStarted
                })
            });
            gettingStartedPageView.render();

            var donatePageView = new DonatePageView({
                model: new Page({
                    route: Route.Donate
                })
            });
            donatePageView.render();

            var aboutPageView = new AboutPageView({
                model: new Page({
                    route: Route.About
                })
            });
            aboutPageView.render();

            var sharePageView = new SharePageView({
                model: new Page({
                    route: Route.Share
                })
            });
            sharePageView.render();

            this.$el.removeClass('is-loading');
        },

        //  Enable keeping track of the current page shown without affecting history and without actually changing the page.
        navigateToRoute: function(event) {
            var route = $(event.currentTarget).data('route');
            Streamus.router.navigate(route, { trigger: true });
        }
    });

    return BodyView;
});