import { View } from 'marionette';
import template from './gettingStarted.hbs';
import styles from './gettingStarted.css';
import LazyImageBehavior from 'behavior/lazyImageBehavior.js';
import CustomElementBehavior from 'behavior/customElementBehavior.js';

export default View.extend({
  className: styles.gettingStarted,
  template,
  templateContext: {
    styles
  },

  behaviors: {
    lazyImage: {
      behaviorClass: LazyImageBehavior
    },
    customElement: {
      behaviorClass: CustomElementBehavior
    }
  }
});