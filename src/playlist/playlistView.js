import { LayoutView } from 'marionette';
import template from './playlist.hbs';
import styles from './playlist.css';
import PlaylistItemsView from './playlistItemsView.js';
import InstallButton from 'button/installButton.js';
import SavePlaylistButtonView from 'button/savePlaylistButtonView.js';
import SavePlaylistButton from 'button/savePlaylistButton.js';

export default LayoutView.extend({
  className: styles.playlist,
  template,
  templateHelpers: {
    styles
  },

  regions: {
    playlistItems: 'playlistItems',
    button: 'button'
  },

  ui: {
    // TODO: Make this able to be databound.
    displayInfo: 'displayInfo'
  },

  initialize() {
    // TODO: This is weird. I know the playlist's ID, but it has not loaded the rest of it's information.
    // So, I check the title and, if it's empty, I know it has not been loaded yet and should be.
    if (this.model.get('title') === '') {
      this.model.fetch().then(this._onFetchResolve.bind(this), this._onFetchReject.bind(this));
    }
  },

  onRender() {
    this._setDisplayInfo(this.model.get('items').getDisplayInfo());

    this.showChildView('button', new SavePlaylistButtonView({
      model: new SavePlaylistButton({
        playlistId: this.model.get('id')
      }),
      // TODO: Rename 'button' models to 'action' to ensure they aren't coupled to a given view.
      installButton: new InstallButton()
    }));

    this.showChildView('playlistItems', new PlaylistItemsView({
      collection: this.model.get('items')
    }));
  },

  _onFetchResolve() {
    this._setDisplayInfo(this.model.get('items').getDisplayInfo());

    this.$el.addClass(styles.isLoaded);
    this.$el.removeClass(styles.isLoading);
  },

  _onFetchReject() {
    this.$el.addClass(styles.hasError);
    this.$el.removeClass(styles.isLoading);
  },

  _setDisplayInfo(displayInfo) {
    this.ui.displayInfo.text(displayInfo);
  }
});