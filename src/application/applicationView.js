import { LayoutView } from 'marionette';
import styles from './application.css';
import template from './application.hbs';
import HeaderRegion from 'header/headerRegion.js';
import FooterRegion from 'footer/footerRegion.js';
import NavigationDrawerRegion from 'navigationDrawer/navigationDrawerRegion.js';
import NotificationRegion from 'notification/notificationRegion.js';
import ContentPagesRegion from 'contentPages/contentPagesRegion.js';
import _ from 'lodash';

export default LayoutView.extend({
  el: 'main',
  template,
  templateHelpers: {
    styles
  },

  regions: {
    header: {
      selector: 'header',
      regionClass: HeaderRegion
    },
    //navigation: {
    //  selector: 'navigationDrawer',
    //  regionClass: NavigationDrawerRegion
    //},
    content: {
      selector: 'content',
      regionClass: ContentPagesRegion
    },
    footer: {
      selector: 'footer',
      regionClass: FooterRegion
    },
    notification: {
      selector: 'notification',
      regionClass: NotificationRegion
    }
  },

  events: {
    'click': '_onClick'
  },

  initialize() {
    // Decorate in initialize because 'el' exists on the page already.
    this.$el.addClass(styles.application);

    // Provide a throttled version of _onWindowScroll because event can fire at a high rate.
    // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    this._onWindowScroll = _.throttleFramerate(this._onWindowScroll.bind(this));
    this._onWindowResize = _.throttleFramerate(this._onWindowResize.bind(this));
    window.addEventListener('scroll', this._onWindowScroll);
    window.addEventListener('resize', this._onWindowResize);

    this.listenTo(App.channels.route.vent, 'shown', this._onRouteShown);
  },

  onRender() {
    // Announce the body has been rendered so every region doesn't have to be manually told to show its view.
    App.channels.body.vent.trigger('rendered');
  },

  onBeforeDestroy() {
    window.removeEventListener('scroll', this._onWindowScroll);
    window.removeEventListener('resize', this._onWindowResize);
  },

  _onClick(event) {
    App.channels.element.vent.trigger('click', event);
  },

  _onWindowScroll() {
    App.channels.window.vent.trigger('scroll', {
      scrollY: window.scrollY
    });
  },

  _onWindowResize() {
    App.channels.window.vent.trigger('resize', {
      height: window.innerHeight,
      width: window.innerWidth
    });
  },

  _onRouteShown() {
    document.body.scrollTop = 0;
  }
});