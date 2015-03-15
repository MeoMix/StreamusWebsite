define(function (require) {
    'use strict';

    var Routable = require('view/behavior/routable');
    
    var DonatePageView = Marionette.ItemView.extend({
        el: '#page-donate',
        template: false,
        
        ui: {
            'payPalFormAmount': '#payPal-form-amount',
            'payPalFormCurrencyCode': '#payPal-form-currencyCode',
            'payPalCurrencyCode': '#payPal-currencyCode',
            'payPalAmount': '#payPal-amount'
        },

        events: {
            'input @ui.payPalCurrencyCode': '_onInputPayPalCurrencyCode',
            'input @ui.payPalAmmount': '_onInputPayPalAmount',
            'submit @ui.payPalForm': '_onSubmitPayPalForm'
        },
        
        behaviors: {
            Routable: {
                behaviorClass: Routable
            }
        },
        
        onRender: function () {
            this._setPayPalFormCurrencyCode(this.ui.payPalCurrencyCode.val());
            this._setPayPalFormAmount(this.ui.payPalAmount.val());
        },
        
        _onInputPayPalCurrencyCode: function () {
            this._setPayPalFormCurrencyCode(this.ui.payPalCurrencyCode.val());
        },
        
        _onInputPayPalAmount: function() {
            this._setPayPalFormAmount(this.ui.payPalAmount.val());
        },
        
        _setPayPalFormCurrencyCode: function(currencyCode) {
            this.ui.payPalFormCurrencyCode.val(currencyCode);
        },
        
        _setPayPalFormAmount: function (amount) {
            this.ui.payPalFormAmount.val(amount);
        }
    });

    return DonatePageView;
});