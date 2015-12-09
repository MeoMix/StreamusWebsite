import { LayoutView } from 'marionette';
import _ from 'lodash';
import Playlists from '../../playlist/playlists';
import PlaylistsView from '../../playlist/playlistsView';
import template from './share.hbs!';
import './share.css!';
import RouteType from '../../common/enum/routeType';
import Updatable from '../../behavior/updatable';

export default LayoutView.extend({
  className: 'share content',
  template,
  templateHelpers: {
    shareRouteType: RouteType.Share
  },

  regions: {
    playlists: 'playlists'
  },

  ui: {
    error: 'error',
    loading: 'loading',
    introduction: 'introduction'
  },

  modelEvents: {
    'change:shareCode': '_onChangeShareCode'
  },

  behaviors: {
    Updatable: {
      behaviorClass: Updatable
    }
  },

  onRender() {
    // If the view was initialized with a ShareCode then go ahead and load it.
    // Otherwise, just let the user know no ShareCode is present and they can act accordingly.
    const shareCode = this.model.get('shareCode');

    if (shareCode === null) {
      this._showIntroduction();
    } else {
      this._loadEntity(shareCode);
    }
  },

  _onChangeShareCode() {
    this.render();
  },

  _showIntroduction() {
    this.ui.introduction.removeClass('is-hidden');
  },

  _loadEntity(shareCode) {
    this.ui.introduction.addClass('is-hidden');
    this.ui.loading.removeClass('is-hidden');

    // Figure out the actual entity ID from the ShareCode by asking the server for more information.
    shareCode.fetchByShortIdAndEntityTitle({
      success: this._onShareCodeFetchSuccess.bind(this),
      error: this._onShareCodeFetchError.bind(this)
    });
  },

  _onShareCodeFetchSuccess(model) {
    this.ui.loading.addClass('is-hidden');

    // Currently, only playlists can be shared.
    this._showPlaylists([model.get('entityId')]);
  },

  _showPlaylists(playlistIds) {
    const playlists = new Playlists(_.map(playlistIds, (playlistId) => {
      return {
        id: playlistId
      };
    }));

    this.showChildView('playlists', new PlaylistsView({
      collection: playlists
    }));
  },

  _onShareCodeFetchError() {
    this.ui.loading.addClass('is-hidden');
    this.ui.error.removeClass('is-hidden');
  }
});