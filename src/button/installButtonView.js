import { LayoutView } from 'marionette';
import styles from './installButton.css!';
import Button from 'behavior/button';
import ViewEntityContainer from 'behavior/viewEntityContainer';

export default LayoutView.extend({
  tagName: 'a',
  className: styles.installButton,
  template: false,

  behaviors: {
    Button: {
      behaviorClass: Button
    },
    ViewEntityContainer: {
      behaviorClass: ViewEntityContainer,
      viewEntityNames: ['model']
    }
  },

  onClick() {
    this.model.install();
  }
});