import { LayoutView } from 'marionette';
import template from './playlistItem.hbs!';
import styles from './playlistItem.css!';

export default LayoutView.extend({
  tagName: 'li',
  className: styles.playlistItem,
  template,
  templateHelpers: {
    styles
  }
});