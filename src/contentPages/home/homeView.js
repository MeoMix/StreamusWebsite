import { View } from 'marionette';
import template from './home.hbs';
import styles from './home.css';
import InstallButton from 'button/installButton.js';
import InstallButtonView from 'button/installButtonView.js';

export default View.extend({
  className: styles.home,
  template,
  templateContext: {
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