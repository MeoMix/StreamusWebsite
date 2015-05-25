define(function(require) {
  'use strict';

  var HeaderRegion = require('view/header/headerRegion');
  var FooterRegion = require('view/footer/footerRegion');
  var SocialRegion = require('view/social/socialRegion');
  var DialogRegion = require('view/dialog/dialogRegion');
  var ContentRegion = require('view/content/contentRegion');
  var RouteType = require('enum/routeType');

  var BodyView = Marionette.LayoutView.extend({
    el: 'body',
    template: false,

    regions: {
      headerRegion: {
        selector: '.headerRegion',
        regionClass: HeaderRegion
      },
      homeRegion: {
        selector: '.homeRegion',
        regionClass: ContentRegion,
        routeType: RouteType.Home
      },
      gettingStartedRegion: {
        selector: '.gettingStartedRegion',
        regionClass: ContentRegion,
        routeType: RouteType.GettingStarted
      },
      faqRegion: {
        selector: '.faqRegion',
        regionClass: ContentRegion,
        routeType: RouteType.Faq
      },
      shareRegion: {
        selector: '.shareRegion',
        regionClass: ContentRegion,
        routeType: RouteType.Share
      },
      aboutRegion: {
        selector: '.aboutRegion',
        regionClass: ContentRegion,
        routeType: RouteType.About
      },
      donateRegion: {
        selector: '.donateRegion',
        regionClass: ContentRegion,
        routeType: RouteType.Donate
      },
      notFoundRegion: {
        selector: '.notFoundRegion',
        regionClass: ContentRegion,
        routeType: RouteType.NotFound
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
      // Announce the body has been rendered so don't have to explicitly tell every region to load its contents.
      Streamus.channels.body.vent.trigger('rendered');
      this.$el.removeClass('is-hidden');
    }
  });

  return BodyView;
});