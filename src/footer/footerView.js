import { LayoutView } from 'marionette';
import TermsOfUseDialogView from 'dialog/termsOfUseDialogView';
import PrivacyDialogView from 'dialog/privacyDialogView';
import ContactDialogView from 'dialog/contactDialogView';

export default LayoutView.extend({
  el: '.footer',
  template: false,

  ui: {
    termsOfUse: 'termsOfUse',
    privacy: 'privacy',
    contact: 'contact'
  },

  events: {
    'click @ui.termsOfUse': '_onClickTermsOfUse',
    'click @ui.privacy': '_onClickPrivacy',
    'click @ui.contact': '_onClickContact'
  },

  _onClickTermsOfUse() {
    this._showTermsOfUseDialog();
  },

  _onClickPrivacy() {
    this._showPrivacyDialog();
  },

  _onClickContact() {
    this._showContactDialog();
  },

  _showTermsOfUseDialog() {
    App.channels.dialog.commands.trigger('show:dialog', TermsOfUseDialogView);
  },

  _showPrivacyDialog() {
    App.channels.dialog.commands.trigger('show:dialog', PrivacyDialogView);
  },

  _showContactDialog() {
    App.channels.dialog.commands.trigger('show:dialog', ContactDialogView);
  }
});