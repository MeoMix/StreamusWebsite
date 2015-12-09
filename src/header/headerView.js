import { LayoutView } from 'marionette';
import LogoView from './logoView';
import NavigationView from './navigationView';

export default LayoutView.extend({
  el: '.header',
  template: false,

  regions: {
    logo: 'logo',
    navigation: 'navigation'
  },

  onRender() {
    this.showChildView('logo', new LogoView());
    this.showChildView('navigation', new NavigationView());
  }
});