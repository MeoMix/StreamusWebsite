import { LayoutView } from 'marionette';
import InstallButton from 'button/installButton';
import InstallButtonView from 'button/installButtonView';
import template from './home.hbs!';
import './home.css!';

export default LayoutView.extend({
  className: 'home content',
  template,

  regions: {
    button: 'button'
  },

  onRender() {
    this.showChildView('button', new InstallButtonView({
      model: new InstallButton()
    }));
  }
});