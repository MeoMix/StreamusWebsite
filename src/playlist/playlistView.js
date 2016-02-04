import { LayoutView } from 'marionette';
import template from './playlist.hbs!';
import styles from './playlist.css!';
import PlaylistItemsView from './playlistItemsView';
import InstallButton from 'button/installButton';
import SavePlaylistButtonView from 'button/savePlaylistButtonView';
import SavePlaylistButton from 'button/savePlaylistButton';

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
    loading: 'loading',
    error: 'error',
    details: 'details',
    title: 'title',
    displayInfo: 'displayInfo'
  },

  modelEvents: {
    'change:title': '_onChangeTitle'
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
      }),
      // TODO: Rename 'button' models to 'action' to ensure they aren't coupled to a given view.
      installButton: new InstallButton()
    }));

    this.showChildView('playlistItems', new PlaylistItemsView({
      collection: this.model.get('items')
    }));
  },

  _onChangeTitle(model, title) {
    this._setTitle(title);
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

  _setTitle(title) {
    this.ui.title.text(title);
  },

  _setDisplayInfo(displayInfo) {
    this.ui.displayInfo.text(displayInfo);
  }
});