import { LayoutView } from 'marionette';
import template from './notFound.hbs!';
import styles from './notFound.css!';

export default LayoutView.extend({
  className: styles.notFound,
  template,
  templateHelpers: {
    styles
  }
});