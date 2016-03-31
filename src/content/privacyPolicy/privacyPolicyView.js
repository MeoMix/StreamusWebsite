import { View } from 'marionette';
import template from './privacyPolicy.hbs';
import styles from './privacyPolicy.css';
import RouteType from 'route/routeType.js';

export default View.extend({
  className: styles.privacyPolicy,
  template,
  templateContext: {
    styles,
    RouteType
  }
});