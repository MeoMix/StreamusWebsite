import { LayoutView } from 'marionette';
import template from './about.hbs!';
import styles from './about.css!';
import LazyImages from 'behavior/lazyImages';

export default LayoutView.extend({
  className: styles.about,
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