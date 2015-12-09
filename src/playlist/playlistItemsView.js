import { CollectionView } from 'marionette';
import PlaylistItemView from './playlistItemView';

export default CollectionView.extend({
  tagName: 'ul',
  className: 'list-group playlistItems',
  childView: PlaylistItemView,
  template: false
});