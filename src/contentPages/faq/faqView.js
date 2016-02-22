import { LayoutView } from 'marionette';
import template from './faq.hbs';
import styles from './faq.css';
import FaqItems from './faqItems.js';
import FaqItemsView from './faqItemsView.js';
import FaqType from './faqType.js';
import RouteType from 'route/routeType.js';
import permissionsDescription from './descriptions/permissions.hbs';
import mobileDescription from './descriptions/mobile.hbs';
import firefoxDescription from './descriptions/firefox.hbs';
import downloadDescription from './descriptions/download.hbs';
import bandwidthDescription from './descriptions/bandwidth.hbs';
import importDescription from './descriptions/import.hbs';
import refreshDescription from './descriptions/refresh.hbs';
import soundCloudDescription from './descriptions/soundCloud.hbs';
import lastfmDescription from './descriptions/lastfm.hbs';
import omniboxDescription from './descriptions/omnibox.hbs';
import networkFailedDescription from './descriptions/networkFailed.hbs';
import flashDescription from './descriptions/flash.hbs';
import blankScreenDescription from './descriptions/blankScreen.hbs';
import truncatedScreenDescription from './descriptions/truncatedScreen.hbs';

// TODO: Scroll into view on initial page load.
export default LayoutView.extend({
  className: styles.faq,
  template,
  templateHelpers: {
    styles
  },

  regions: {
    general: 'general',
    troubleshooting: 'troubleshooting'
  },

  _faqItems: null,

  initialize() {
    this._faqItems = new FaqItems([{
      id: 'permissions',
      title: 'Can you please explain Streamus\' permission requests?',
      description: permissionsDescription,
      type: FaqType.General
    }, {
      id: 'mobile',
      title: 'Is there a mobile app?',
      description: mobileDescription,
      type: FaqType.General
    }, {
      id: 'firefox',
      title: 'Firefox support?',
      description: firefoxDescription,
      type: FaqType.General
    }, {
      id: 'download',
      title: 'Can I download songs to my computer for offline playback?',
      description: downloadDescription,
      type: FaqType.General
    }, {
      id: 'bandwidth',
      title: 'Does Streamus use less bandwidth than regular YouTube?',
      description: bandwidthDescription,
      type: FaqType.General
    }, {
      id: 'import',
      title: 'How can I import a YouTube playlist?',
      description: importDescription,
      type: FaqType.General
    }, {
      id: 'refresh',
      title: 'Will imported YouTube playlists refresh when new content is added on YouTube?',
      description: refreshDescription,
      type: FaqType.General
    }, {
      id: 'soundcloud',
      title: 'SoundCloud support?',
      description: soundCloudDescription,
      type: FaqType.General
    }, {
      id: 'lastfm',
      title: 'Last.FM support?',
      description: lastfmDescription,
      type: FaqType.General
    }, {
      id: 'omnibox',
      title: 'Can I change the keyword using for triggering omnibox search?',
      description: omniboxDescription,
      type: FaqType.General
    }, {
      id: 'network-failed',
      title: 'I received the error \'NETWORK_FAILED\' when I tried to installed.',
      description: networkFailedDescription,
      type: FaqType.Troubleshooting
    }, {
      id: 'flash',
      title: 'I received a message about Streamus detecting Flash.',
      description: flashDescription,
      type: FaqType.Troubleshooting
    }, {
      id: 'blank-screen',
      title: 'All I see when I open Streamus is a blank screen.',
      description: blankScreenDescription,
      type: FaqType.Troubleshooting
    }, {
      id: 'truncated-screen',
      title: 'I can\'t see all of Streamus when I open it. Some of the UI is cut off.',
      description: truncatedScreenDescription,
      type: FaqType.Troubleshooting
    }]);

    const initialActiveItemId = this.model.get('initialActiveItemId');
    if (initialActiveItemId !== '') {
      this._faqItems.findWhere({ id: initialActiveItemId }).set('isActive', true);
    }

    this.listenTo(this._faqItems, 'change:isActive', this._onFaqItemsChangeIsActive);
  },

  onRender() {
    this.showChildView('general', new FaqItemsView({
      type: FaqType.General,
      collection: this._faqItems
    }));

    this.showChildView('troubleshooting', new FaqItemsView({
      type: FaqType.Troubleshooting,
      collection: this._faqItems
    }));
  },

  _onFaqItemsChangeIsActive(faqItem, isActive) {
    const urlFragment = `${RouteType.Faq}/`;

    if (isActive) {
      App.router.navigate(`${urlFragment}${faqItem.get('id')}`);
    } else {
      const hasActiveItem = this._faqItems.contains({
        isActive: true
      });

      if (!hasActiveItem) {
        App.router.navigate(urlFragment);
      }
    }
  }
});