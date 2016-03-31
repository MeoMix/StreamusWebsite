import { View } from 'marionette';
import template from './playlist.hbs';
import styles from './playlist.css';
import PlaylistItemsView from './playlistItemsView.js';
import SavePlaylistButtonView from './savePlaylistButtonView.js';
import SavePlaylistButton from './savePlaylistButton.js';
import CustomElementBehavior from 'behavior/customElementBehavior.js';

export default View.extend({
  className: styles.playlist,
  template,
  templateContext: {
    styles
  },

  regions: {
    playlistItems: 'playlistItems',
    button: 'button'
  },

  ui: {
    title: 'title',
    displayInfo: 'displayInfo'
  },

  modelEvents: {
    'request': '_onRequest'
  },

  behaviors: {
    customElement: {
      behaviorClass: CustomElementBehavior
    }
  },

  initialize() {
    // TODO: This is weird. I know the playlist's ID, but it has not loaded the rest of it's information.
    // So, I check the title and, if it's empty, I know it has not been loaded yet and should be.
    if (this.model.get('title') === '') {
      this.model.fetch().then(this._onFetchResolve.bind(this), this._onFetchReject.bind(this));
    }
  },

  onRender() {
    this._setTitle(this.model.get('title'));
    this._setDisplayInfo(this.model.get('items').getDisplayInfo());

    this.showChildView('button', new SavePlaylistButtonView({
      model: new SavePlaylistButton({
        playlistId: this.model.get('id')
      })
    }));

    this.showChildView('playlistItems', new PlaylistItemsView({
      collection: this.model.get('items')
    }));
  },

  _onRequest() {
    this.el.classList.add(styles.isLoading);
  },

  _onFetchResolve() {
    this._setTitle(this.model.get('title'));
    this._setDisplayInfo(this.model.get('items').getDisplayInfo());

    this.el.classList.add(styles.isLoaded);
    this.el.classList.remove(styles.isLoading);
  },

  _onFetchReject() {
    this.el.classList.add(styles.hasError);
    this.el.classList.remove(styles.isLoading);
  },

  _setTitle(title) {
    this.ui.title.text(title);
  },

  _setDisplayInfo(displayInfo) {
    this.ui.displayInfo.text(displayInfo);
  }
});