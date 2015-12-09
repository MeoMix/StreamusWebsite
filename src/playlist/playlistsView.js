import { CollectionView } from 'marionette';
import PlaylistView from './playlistView';

export default CollectionView.extend({
  className: 'playlists row',
  template: false,
  childView: PlaylistView
});