import { LayoutView } from 'marionette';
import template from './share.hbs';
import styles from './share.css';
import Playlist from 'playlist/playlist.js';
import PlaylistView from 'playlist/playlistView.js';
import RouteType from 'route/routeType.js';

export default LayoutView.extend({
  className: styles.share,
  template,
  templateHelpers: {
    styles,
    RouteType
  },

  regions: {
    playlist: 'playlist'
  },

  modelEvents: {
    'change:isLoading': '_onChangeIsLoading',
    'change:hasError': '_onChangeHasError',
    'change:hasPlaylist': '_onChangeHasPlaylist'
  },

  _loadingStartTime: null,
  _loadedPlaylistTimeout: null,
  _minLoadingDisplayTime: 1000,

  onRender() {
    this.el.addEventListener('card:created', () => {
      console.log('yo');
    });
    // If the view was initialized with a ShareCode then go ahead and load it.
    // Otherwise, just let the user know no ShareCode is present and they can act accordingly.
    const shareCode = this.model.get('shareCode');

    if (shareCode) {
      this._loadEntity(shareCode);
    }
  },

  _onChangeIsLoading(model, isLoading) {
    this.el.classList.toggle(styles.isLoading, isLoading);
  },

  _onChangeHasError(model, hasError) {
    this.el.classList.toggle(styles.hasError, hasError);
  },

  _onChangeHasPlaylist(model, hasPlaylist) {
    this.el.classList.toggle(styles.hasPlaylist, hasPlaylist);
  },

  _loadEntity(shareCode) {
    this.model.set({
      isLoading: true,
      hasPlaylist: false
    });

    this._loadingStartTime = performance.now();

    // Figure out the actual entity ID from the ShareCode by asking the server for more information.
    shareCode.fetchByShortIdAndEntityTitle().then(this._onFetchResolve.bind(this), this._onFetchReject.bind(this));
  },

  _onFetchResolve() {
    const currentDisplayTime = performance.now() - this._loadingStartTime;
    const remainingDisplayTime = this._minLoadingDisplayTime - currentDisplayTime;

    if (remainingDisplayTime > 0) {
      this._setLoadedPlaylistTimeout(remainingDisplayTime);
    } else {
      this._showLoadedPlaylist();
    }
  },

  _onFetchReject() {
    this.model.set({
      isLoading: false,
      hasError: true
    });
  },

  _setLoadedPlaylistTimeout(delay) {
    this._loadedPlaylistTimeout = setTimeout(() => this._showLoadedPlaylist(), delay);
  },

  _clearLoadedPlaylistTimeout() {
    clearTimeout(this._loadedPlaylistTimeout);
  },

  _showLoadedPlaylist() {
    this._clearLoadedPlaylistTimeout();

    this.model.set({
      isLoading: false,
      hasPlaylist: true
    });

    const playlist = new Playlist({
      id: this.model.get('shareCode').get('entityId')
    });

    this.showChildView('playlist', new PlaylistView({
      model: playlist,
      collection: playlist.get('items')
    }));
  }
});