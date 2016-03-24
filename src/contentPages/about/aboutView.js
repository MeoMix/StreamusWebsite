import { View } from 'marionette';
import template from './about.hbs';
import styles from './about.css';
import LazyImageBehavior from 'behavior/lazyImageBehavior.js';

export default View.extend({
  className: styles.about,
  template,
  templateContext: {
    styles
  },

  behaviors: {
    lazyImage: {
      behaviorClass: LazyImageBehavior
    }
  }
});