define([
    'view/genericContentView',
    'model/contentPage',
    'enum/route'
], function (GenericContentView, ContentPage, Route) {
    'use strict';

    var DonateContentView = GenericContentView.extend({
        el: $('#donateContent'),
        
        model: new ContentPage({
            route: Route.Donate
        }),

        events: {
            'submit #payPalDonateForm': 'updateFormAndSubmit'
        },
        
        //  Update the form submitted to PayPal with the values currently represented in the combo boxes.
        //  Then submit it to process the user's request.
        updateFormAndSubmit: function (event) {

            var selectedCurrency = $('#currencySelect').val();
            var donationAmount = parseInt($('#donationAmount').val(), 10);

            var form = $(event.currentTarget);
            form.find('input[name="currency_code"]').val(selectedCurrency);
            form.find('input[name="amount"]').val(donationAmount);

        }

    });

    return DonateContentView;
});