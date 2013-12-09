define([
    'model/genericDialog',
    'view/genericDialogView',
    'view/termsOfUseView',
    'view/privacyView',
    'view/contactView'
], function (GenericDialog, GenericDialogView, TermsOfUseView, PrivacyView, ContactView) {
    'use strict';

    var FooterView = Backbone.View.extend({

        el: $('div.footer'),

        events: {
            'click #touButton': 'showTouDialog',
            'click #privacyButton': 'showPrivacyDialog',
            'click #contactButton': 'showContactDialog'
        },

        showTouDialog: function () {
            var termsOfUseDialog = new GenericDialog({
                title: 'Terms of Use',
                body: new TermsOfUseView()
            });

            var termsOfUseDialogView = new GenericDialogView({
                model: termsOfUseDialog
            });

            termsOfUseDialogView.show();
        },

        showPrivacyDialog: function () {
            var privacyDialog = new GenericDialog({
                title: 'Privacy',
                body: new PrivacyView()
            });

            var privacyDialogView = new GenericDialogView({
                model: privacyDialog
            });

            privacyDialogView.show();
        },

        showContactDialog: function () {
            var contactDialog = new GenericDialog({
                title: 'Contact',
                body: new ContactView()
            });

            var contactDialogView = new GenericDialogView({
                model: contactDialog
            });

            contactDialogView.show();
        }   

    });

    return FooterView;
});