import { LayoutView } from 'marionette';
import template from './termsOfUse.hbs';
import styles from './termsOfUse.css';
import RouteType from 'route/routeType.js';

export default LayoutView.extend({
  className: styles.termsOfUse,
  template,
  templateHelpers: {
    styles,
    RouteType
  }
});