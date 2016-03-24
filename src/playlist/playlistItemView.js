import { View } from 'marionette';
import template from './playlistItem.hbs';
import styles from './playlistItem.css';

export default View.extend({
  tagName: 'li',
  className: styles.playlistItem,
  template,
  templateContext: {
    styles
  }
});