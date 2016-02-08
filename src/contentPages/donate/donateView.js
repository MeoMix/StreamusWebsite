import { LayoutView } from 'marionette';
import template from './donate.hbs';
import styles from './donate.css';
import InputType from 'component/input/inputType.js';

export default LayoutView.extend({
  className: styles.donate,
  template,
  templateHelpers: {
    styles,
    InputType
  },

  ui: {
    form: 'form'
  },

  events: {
    'submit @ui.form': '_onFormSubmit'
  },

  // TODO: Perform form validation and send via model?
  _onFormSubmit() {
    //this.ui.payPalForm[0].submit();
  }
});