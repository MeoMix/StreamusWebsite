import { View } from 'marionette';
import styles from './application.css';
import template from './application.hbs';
import HeaderRegion from 'header/headerRegion.js';
import FooterRegion from 'footer/footerRegion.js';
import SnackbarRegion from 'snackbar/snackbarRegion.js';
import ContentPagesRegion from 'contentPages/contentPagesRegion.js';
import _ from 'lodash';

export default View.extend({
  el: 'main',
  template,
  templateContext: {
    styles
  },

  regions: {
    header: {
      selector: 'header',
      regionClass: HeaderRegion
    },
    content: {
      selector: 'content',
      regionClass: ContentPagesRegion
    },
    footer: {
      selector: 'footer',
      regionClass: FooterRegion
    },
    snackbar: {
      selector: 'snackbar',
      regionClass: SnackbarRegion
    }
  },

  events: {
    'click': '_onClick'
  },

  initialize() {
    // Decorate in initialize because 'el' exists on the page already.
    this.el.classList.add(styles.application);

    // Provide a throttled version of _onWindowScroll because event can fire at a high rate.
    // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    this._onWindowScroll = _.throttleFramerate(this._onWindowScroll.bind(this));
    this._onWindowResize = _.throttleFramerate(this._onWindowResize.bind(this));
    window.addEventListener('scroll', this._onWindowScroll);
    window.addEventListener('resize', this._onWindowResize);

    this.listenTo(App.channels.route, 'shown', this._onRouteShown);
  },

  onRender() {
    // Announce the body has been rendered so every region doesn't have to be manually told to show its view.
    App.channels.body.trigger('rendered');
  },

  onBeforeDestroy() {
    window.removeEventListener('scroll', this._onWindowScroll);
    window.removeEventListener('resize', this._onWindowResize);
  },

  _onClick(event) {
    App.channels.element.trigger('click', event);
  },

  _onWindowScroll() {
    App.channels.window.trigger('scroll', {
      scrollY: window.scrollY
    });
  },

  _onWindowResize() {
    App.channels.window.trigger('resize', {
      height: window.innerHeight,
      width: window.innerWidth
    });
  },

  _onRouteShown() {
    document.body.scrollTop = 0;
  }
});