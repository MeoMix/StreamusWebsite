import { CollectionView } from 'marionette';
import styles from './playlistItems.css!';
import PlaylistItemView from './playlistItemView';

export default CollectionView.extend({
  tagName: 'ul',
  className: styles.playlistItems,
  childView: PlaylistItemView
});