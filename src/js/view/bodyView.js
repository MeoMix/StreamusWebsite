define(function(require) {
    'use strict';

    var HeaderRegion = require('view/header/headerRegion');
    var HomePageRegion = require('view/page/home/homePageRegion');
    var GettingStartedPageRegion = require('view/page/gettingStarted/gettingStartedPageRegion');
    var AboutPageRegion = require('view/page/about/aboutPageRegion');
    var DonatePageRegion = require('view/page/donate/donatePageRegion');
    var SharePageRegion = require('view/page/share/sharePageRegion');
    var FooterRegion = require('view/footer/footerRegion');
    var SocialRegion = require('view/social/socialRegion');
    var DialogRegion = require('view/dialog/dialogRegion');

    var BodyView = Marionette.LayoutView.extend({
        el: 'body',
        template: false,

        regions: {
            headerRegion: {
                selector: '.headerRegion',
                regionClass: HeaderRegion
            },
            homePageRegion: {
                selector: '.homePageRegion',
                regionClass: HomePageRegion
            },
            gettingStartedPageRegion: {
                selector: '.gettingStartedPageRegion',
                regionClass: GettingStartedPageRegion
            },
            aboutPageRegion: {
                selector: '.aboutPageRegion',
                regionClass: AboutPageRegion
            },
            donatePageRegion: {
                selector: '.donatePageRegion',
                regionClass: DonatePageRegion
            },
            sharePageRegion: {
                selector: '.sharePageRegion',
                regionClass: SharePageRegion
            },
            footerRegion: {
                selector: '.footerRegion',
                regionClass: FooterRegion
            },
            socialRegion: {
                selector: '.socialRegion',
                regionClass: SocialRegion
            },
            dialogRegion: {
                selector: '.dialogRegion',
                regionClass: DialogRegion
            }
        },

        onRender: function() {
            Streamus.channels.body.vent.trigger('rendered');
            this.$el.removeClass('is-hidden');
        }
    });

    return BodyView;
});