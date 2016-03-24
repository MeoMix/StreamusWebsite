import { View } from 'marionette';
import template from './notFound.hbs';
import styles from './notFound.css';

export default View.extend({
  className: styles.notFound,
  template,
  templateContext: {
    styles
  }
});