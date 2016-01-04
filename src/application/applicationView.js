import { LayoutView } from 'marionette';
import styles from './application.css!';
import template from './application.hbs!';
import HeaderRegion from 'header/headerRegion';
import FooterRegion from 'footer/footerRegion';
import SocialRegion from 'social/socialRegion';
import DialogRegion from 'dialog/dialogRegion';
import ContentRegion from 'content/contentRegion';
import RouteType from 'common/enum/routeType';

export default LayoutView.extend({
  el: 'main',
  template,

  regions: {
    header: {
      selector: 'header',
      regionClass: HeaderRegion
    },
    // TODO: Replace usage of ContentRegion with a CollectionView of pages.
    home: {
      selector: 'home',
      regionClass: ContentRegion,
      routeType: RouteType.Home
    },
    gettingStarted: {
      selector: 'gettingStarted',
      regionClass: ContentRegion,
      routeType: RouteType.GettingStarted
    },
    faq: {
      selector: 'faq',
      regionClass: ContentRegion,
      routeType: RouteType.Faq
    },
    share: {
      selector: 'share',
      regionClass: ContentRegion,
      routeType: RouteType.Share
    },
    about: {
      selector: 'about',
      regionClass: ContentRegion,
      routeType: RouteType.About
    },
    donate: {
      selector: 'donate',
      regionClass: ContentRegion,
      routeType: RouteType.Donate
    },
    notFound: {
      selector: 'notFound',
      regionClass: ContentRegion,
      routeType: RouteType.NotFound
    },
    footer: {
      selector: 'footer',
      regionClass: FooterRegion
    },
    social: {
      selector: 'social',
      regionClass: SocialRegion
    },
    dialog: {
      selector: 'dialog',
      regionClass: DialogRegion
    }
  },

  onRender() {
    // Announce the body has been rendered so don't have to explicitly tell every region to load its contents.
    App.channels.body.vent.trigger('rendered');
    this.$el.removeClass('is-hidden');
  }
});