import { LayoutView } from 'marionette';
import template from './privacyPolicy.hbs';
import styles from './privacyPolicy.css';
import RouteType from 'route/routeType.js';

export default LayoutView.extend({
  className: styles.privacyPolicy,
  template,
  templateHelpers: {
    styles,
    RouteType
  }
});