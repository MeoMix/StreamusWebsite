define(function(require) {
    'use strict';

    var DonateTemplate = require('text!template/donate.html');

    var DonateView = Marionette.ItemView.extend({
        template: _.template(DonateTemplate),

        ui: {
            coinbaseModal: '.coinbase-modal',
            coinbaseButton: '.coinbase-button'
        },

        initialize: function() {
            //  Respond to messages sent from within the coinbase iframe
            window.addEventListener('message', this._onWindowMessage.bind(this), false);
        },

        _onWindowMessage: function(response) {
            if (response.origin === 'https://www.coinbase.com') {
                var action = response.data.split('|')[0];
                this._doCoinbaseAction(action);
            }
        },

        _doCoinbaseAction: function(action) {
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
            }
        }
    });

    return DonateView;
});