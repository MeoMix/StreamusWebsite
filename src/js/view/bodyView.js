//  TODO: BodyView loads the HTML for share.streamus and streamus.com irregardless of which is requested -- need to fix.
define([
    'router',
    'model/genericDialog',
    'view/socialView',
    'view/installButtonView',
    'view/genericDialogView',
    'view/termsOfUseView',
    'view/privacyView',
    'view/contactView',
    'view/footerView',
    'view/logoView'
], function (Router, GenericDialog, SocialView, InstallButtonView, GenericDialogView, TermsOfUseView, PrivacyView, ContactView, FooterView, LogoView) {
    'use strict';

    var BodyView = Backbone.View.extend({
        el: $('body'),

        narrowContainer: $('body div.container-narrow'),
        logoWrapper: $('body div.logoWrapper'),

        events: {
            'click .logoWrapper a': 'goHome',
            'click *[data-contentid]': 'clicked',
            'submit #donateForm': 'updateFormAndSubmit',
            'click #touButton': 'showTouDialog',
            'click #privacyButton': 'showPrivacyDialog',
            'click #contactButton': 'showContactDialog'
        },

        installButton: new InstallButtonView(),
        socialView: new SocialView(),
        footerView: new FooterView(),
        logoView: new LogoView(),
        router: new Router(),

        initialize: function () {
            
            this.$el.append(this.socialView.render().el);
            this.socialView.appendScripts();

            this.narrowContainer.append(this.footerView.render().el);
            this.logoWrapper.append(this.logoView.render().el);

            //var activeLink = this.$el.find('ul.nav li a[href="' + window.location.hash + '"]');

            //if (activeLink.length > 0) {
            //    this.showViewBasedOnListItem(activeLink.parent());
            //}

            //var self = this;
            //window.onhashchange = function () {

            //    var hash = $.trim(window.location.hash);

            //    if (hash !== '') {
            //        self.showContentBasedOnHash(hash);
            //    } else {
            //        // assume home if nothing.
            //        self.showContentBasedOnHash('#home');
            //    }

            //};

            ////  Set the initial page if the hash is set on load.
            //var initialHash = $.trim(window.location.hash);

            //if (initialHash !== '') {
            //    this.showContentBasedOnHash(initialHash);
            //}
            
            this.$el.removeClass('loading');            
        },

        showContentBasedOnHash: function (hash) {

            var listItem = null;

            switch (hash) {
                case '#home':
                    listItem = this.$el.find('[data-contentid="' + 'homeContent' + '"]');
                    break;
                case '#getting-started':
                    listItem = this.$el.find('[data-contentid="' + 'gettingStartedContent' + '"]');
                    break;
                case '#about':
                    listItem = this.$el.find('[data-contentid="' + 'aboutContent' + '"]');
                    break;
                case '#donate':
                    listItem = this.$el.find('[data-contentid="' + 'donateContent' + '"]');
                    break;
                default:
                    console.error("Unhandled hash:", window.location.hash);
                    break;
            }

            this.showViewBasedOnListItem(listItem);

        },

        //  Enable keeping track of the current content shown without affecting history and without actually changing the page.
        clicked: function (event) {

            var contentSelector = $(event.currentTarget);
            var contentId = contentSelector.data('contentid');

            switch (contentId) {
                case 'homeContent':
                    location.replace("#home");
                    break;
                case 'gettingStartedContent':
                    location.replace("#getting-started");
                    break;
                case 'aboutContent':
                    location.replace("#about");
                    break;
                case 'donateContent':
                    location.replace("#donate");
                    break;
                default:
                    console.error("Unhandled contentId:", contentId);
            }

        },

        showViewBasedOnListItem: function (listItem) {
            this.$el.find('.active').removeClass('active');

            var contentId = listItem.data('contentid');

            listItem.addClass('active');

            $('.content').hide();

            $('#' + contentId).show();
        },

        goHome: function () {
            this.navigationView.$el.first().click();
        },

        updateFormAndSubmit: function (event) {

            var selectedCurrency = $('#currencySelect').val();
            var donationAmount = parseInt($('#donationAmount').val(), 10);

            var form = $(event.currentTarget);
            form.find('input[name="currency_code"]').val(selectedCurrency);
            form.find('input[name="amount"]').val(donationAmount);

        },
        
        showTouDialog: function () {

            var termsOfUseDialog = new GenericDialog({
                title: 'Terms of Use',
                body: new TermsOfUseView()
            });

            var termsOfUseDialogView = new GenericDialogView({
                model: termsOfUseDialog
            });

            this.$el.append(termsOfUseDialogView.render().el);
        },
        
        showPrivacyDialog: function () {

            var privacyDialog = new GenericDialog({
                title: 'Privacy',
                body: new PrivacyView()
            });

            var privacyDialogView = new GenericDialogView({
                model: privacyDialog
            });

            this.$el.append(privacyDialogView.render().el);
        },
        
        showContactDialog: function () {
            var contactDialog = new GenericDialog({
                title: 'Contact',
                body: new ContactView()
            });

            var contactDialogView = new GenericDialogView({
                model: contactDialog
            });

            this.$el.append(contactDialogView.render().el);
        }

    });

    return new BodyView();
});