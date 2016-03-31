import { View } from 'marionette';
import template from './home.hbs';
import styles from './home.css';
import InstallButton from './installButton.js';
import InstallButtonView from './installButtonView.js';

export default View.extend({
  //tagName: 'streamus-content',
  className: styles.home,
  attributes: {
    is: 'streamus-content'
  },
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