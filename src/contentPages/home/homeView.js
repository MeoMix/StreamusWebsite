import { LayoutView } from 'marionette';
import template from './home.hbs';
import styles from './home.css';
import InstallButton from 'button/installButton.js';
import InstallButtonView from 'button/installButtonView.js';

export default LayoutView.extend({
  className: styles.home,
  template,
  templateHelpers: {
    styles
  },

  regions: {
    button: 'button'
  },

  onRender() {
    this.showChildView('button', new InstallButtonView({
      model: new InstallButton()
    }));
  }
});