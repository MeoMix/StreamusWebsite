import { LayoutView } from 'marionette';
import RouteType from 'common/enum/routeType';
import template from './logo.hbs!';

export default LayoutView.extend({
  tagName: 'a',
  template,
  attributes: {
    href: `/${RouteType.Home}`
  }
});