import { LayoutView } from 'marionette';
import template from './donate.hbs!';
import styles from './donate.css!';
import InputType from 'component/input/inputType';

export default LayoutView.extend({
  className: styles.donate,
  template,
  templateHelpers: {
    styles,
    InputType
  },

  ui: {
    //coinbaseModal: 'coinbaseModal',
    //coinbaseButton: 'coinbaseButton',
    payPalButton: 'payPalButton',
    payPalForm: 'payPalForm'
  },

  events: {
    // TODO: Just make this a submit button.
    'click @ui.payPalButton': '_onClickPayPalButton'
  },

  initialize() {
    // Respond to messages sent from within the coinbase iframe
    window.addEventListener('message', this._onWindowMessage.bind(this), false);
  },

  _onWindowMessage(response) {
    if (response.origin === 'https://www.coinbase.com') {
      const action = response.data.split('|')[0];
      this._doCoinbaseAction(action);
    }
  },

  _onClickPayPalButton() {
    this.ui.payPalForm[0].submit();
  },

  _doCoinbaseAction(action) {
    switch (action) {
      case 'show modal iframe':
        this.ui.coinbaseModal.show();
        break;
      case 'coinbase_payment_complete':
        this.ui.coinbaseButton.attr('src', 'https://www.coinbase.com/buttons/paid');
        break;
      case 'hide modal':
        this.ui.coinbaseModal.hide();
        break;
      case 'signup redirect':
        document.location = 'https://www.coinbase.com/users/verify';
        break;
      default:
    }
  }
});