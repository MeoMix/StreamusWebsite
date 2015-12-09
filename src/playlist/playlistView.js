import { LayoutView } from 'marionette';
import template from './playlist.hbs!';
import PlaylistItemsView from './playlistItemsView';
import InstallButton from 'button/installButton';
import SavePlaylistButtonView from 'button/savePlaylistButtonView';
import SavePlaylistButton from 'button/savePlaylistButton';

export default LayoutView.extend({
  className: 'playlist col-md-offset-2 col-md-8',
  template,

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

  initialize() {
    // TODO: This is weird. I know the playlist's ID, but it has not loaded the rest of it's information.
    // So, I check the title and, if it's empty, I know it has not been loaded yet and should be.
    if (this.model.get('title') === '') {
      this.model.fetch({
        success: this._onPlaylistFetchSuccess.bind(this),
        error: this._onPlaylistFetchError.bind(this)
      });
    }
  },

  onRender() {
    this._setTitle(this.model.get('title'));
    this._setDisplayInfo(this.model.get('items').getDisplayInfo());
    this._renderButton();

    this.showChildView('playlistItems', new PlaylistItemsView({
      collection: this.model.get('items')
    }));
  },

  _onChangeTitle(model, title) {
    this._setTitle(title);
  },

  _onPlaylistFetchSuccess(model) {
    this._setTitle(model.get('title'));
    this._setDisplayInfo(model.get('items').getDisplayInfo());

    this.ui.loading.addClass('is-hidden');
    this.ui.details.removeClass('is-hidden');
  },

  _onPlaylistFetchError() {
    this.ui.loading.addClass('is-hidden');
    this.ui.error.removeClass('is-hidden');
  },

  _setTitle(title) {
    this.ui.title.text(title);
  },

  _setDisplayInfo(displayInfo) {
    this.ui.displayInfo.text(displayInfo);
  },

  _renderButton() {
    this.showChildView('button', new SavePlaylistButtonView({
      model: new SavePlaylistButton({
        playlistId: this.model.get('id')
      }),
      // TODO: Rename 'button' models to 'action' to ensure they aren't coupled to a given view.
      installButton: new InstallButton()
    }));
  }
});