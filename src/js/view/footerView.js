define([
    'text!template/footer.html',
    'model/genericDialog',
    'view/genericDialogView',
    'view/termsOfUseView',
    'view/privacyView',
    'view/contactView'
], function (FooterTemplate, GenericDialog, GenericDialogView, TermsOfUseView, PrivacyView, ContactView) {
    'use strict';

    var FooterView = Backbone.View.extend({

        className: 'footer row',

        template: _.template(FooterTemplate),
        
        //  When requesting images from a sub-domain I need to be explicit with where I am retrieving the resources... I think.
        urlPrefix: window.location.host === 'share.streamus.com' ? 'http://www.streamus.com/' : '',
        
        events: {
            'click #touButton': 'showTouDialog',
            'click #privacyButton': 'showPrivacyDialog',
            'click #contactButton': 'showContactDialog'
        },

        render: function () {
            this.$el.html(this.template({
                urlPrefix: this.urlPrefix
            }));
            
            return this;
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