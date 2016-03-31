import { View } from 'marionette';
import template from './termsOfUse.hbs';
import styles from './termsOfUse.css';
import RouteType from 'route/routeType.js';

export default View.extend({
  className: styles.termsOfUse,
  template,
  templateContext: {
    styles,
    RouteType
  }
});