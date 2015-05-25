define(function(require) {
  'use strict';

  var TermsOfUseDialogView = require('view/dialog/termsOfUseDialogView');
  var PrivacyDialogView = require('view/dialog/privacyDialogView');
  var ContactDialogView = require('view/dialog/contactDialogView');

  var FooterView = Marionette.LayoutView.extend({
    el: '.footer',
    template: false,

    ui: {
      termsOfUse: '.termsOfUse',
      privacy: '.privacy',
      contact: '.contact'
    },

    events: {
      'click @ui.termsOfUse': '_onClickTermsOfUse',
      'click @ui.privacy': '_onClickPrivacy',
      'click @ui.contact': '_onClickContact'
    },

    _onClickTermsOfUse: function() {
      this._showTermsOfUseDialog();
    },

    _onClickPrivacy: function() {
      this._showPrivacyDialog();
    },

    _onClickContact: function() {
      this._showContactDialog();
    },

    _showTermsOfUseDialog: function() {
      Streamus.channels.dialog.commands.trigger('show:dialog', TermsOfUseDialogView);
    },

    _showPrivacyDialog: function() {
      Streamus.channels.dialog.commands.trigger('show:dialog', PrivacyDialogView);
    },

    _showContactDialog: function() {
      Streamus.channels.dialog.commands.trigger('show:dialog', ContactDialogView);
    }
  });

  return FooterView;
});