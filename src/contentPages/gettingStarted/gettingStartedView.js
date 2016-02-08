import { LayoutView } from 'marionette';
import template from './gettingStarted.hbs';
import styles from './gettingStarted.css';
import LazyImages from 'behavior/lazyImages.js';

export default LayoutView.extend({
  className: styles.gettingStarted,
  template,
  templateHelpers: {
    styles
  },

  behaviors: {
    LazyImages: {
      behaviorClass: LazyImages
    }
  }
});