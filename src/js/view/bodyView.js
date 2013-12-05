//  TODO: BodyView loads the HTML for share.streamus and streamus.com irregardless of which is requested -- need to fix.
define([
    'model/genericDialog',
    'view/socialView',
    'view/installButtonView',
    'view/genericDialogView',
    'view/termsOfUseView',
    'view/privacyView',
    'view/contactView',
    'view/footerView',
    'view/logoView',
    'view/homeContentView',
    'view/gettingStartedContentView',
    'view/aboutContentView',
    'view/donateContentView',
    'view/navigationView'
], function (GenericDialog, SocialView, InstallButtonView, GenericDialogView, TermsOfUseView, PrivacyView, ContactView, FooterView, LogoView, HomeContentView, GettingStartedContentView, AboutContentView, DonateContentView, NavigationView) {
    'use strict';

    var BodyView = Backbone.View.extend({
        el: $('body'),

        narrowContainer: $('body > div.container-narrow'),
        logoWrapper: $('body div.logoWrapper'),
        navigationWrapper: $('body div.navigationWrapper'),
        contentWrapper: $('body div.contentWrapper'),

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
        homeContentView: new HomeContentView(),
        gettingStartedContentView: new GettingStartedContentView(),
        aboutContentView: new AboutContentView(),
        donateContentView: new DonateContentView(),
        navigationView: new NavigationView(),

        initialize: function () {
            
            this.$el.append(this.socialView.render().el);
            this.appendSocialScripts();
            
            //  TODO: Crappy hack. Only append the HTML when loading the root domain.
            if (window.location.host !== 'share.streamus.com') {

                this.contentWrapper.append(this.homeContentView.render().el);
                this.contentWrapper.append(this.gettingStartedContentView.render().el);
                this.contentWrapper.append(this.aboutContentView.render().el);
                this.contentWrapper.append(this.donateContentView.render().el);

                this.navigationWrapper.append(this.navigationView.render().el);
            }

            this.narrowContainer.append(this.footerView.render().el);
            this.logoWrapper.append(this.logoView.render().el);

            var activeLink = this.$el.find('ul.nav li a[href="' + window.location.hash + '"]');

            if (activeLink.length > 0) {
                this.showViewBasedOnListItem(activeLink.parent());
            }

            var self = this;
            window.onhashchange = function () {

                var hash = $.trim(window.location.hash);

                if (hash !== '') {
                    self.showContentBasedOnHash(hash);
                } else {
                    // assume home if nothing.
                    self.showContentBasedOnHash('#home');
                }

            };

            //  Set the initial page if the hash is set on load.
            var initialHash = $.trim(window.location.hash);

            if (initialHash !== '') {
                this.showContentBasedOnHash(initialHash);
            }
            
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
        
        showTouDialog: function() {
            var termsOfUseDialogView = new GenericDialogView({
                model: {
                    title: 'Terms of Use',
                    body: new TermsOfUseView()
                }
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

            this.listenTo(privacyDialog, 'destroy', function () {
                //  TODO: I think this is necessary? Double check!! Might be important for Streamus.
                this.stopListening(privacyDialog, 'destroy');
            });
        },
        
        showContactDialog: function() {
            var contactDialogView = new GenericDialogView({
                model: {
                    title: 'Contact',
                    body: new ContactView()
                }
            });

            this.$el.append(contactDialogView.render().el);
        },
        
        appendSocialScripts: function () {
            //  TODO: How can I detect these scripts loading so I know when to actually fade it in?
            var facebookButtonScript = $('<script>', {
                async: true,
                defer: true,
                id: 'facebook-jssdk',
                src: '//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252'
            });
            this.$el.append(facebookButtonScript);

            var twitterButtonScript = $('<script>', {
                async: true,
                defer: true,
                id: 'twitter-wjs',
                src: '//platform.twitter.com/widgets.js'
            });
            this.$el.append(twitterButtonScript);

            var googlePlusButtonScript = $('<script>', {
                async: true,
                defer: true,
                id: 'google-jspo',
                src: 'https://apis.google.com/js/plusone.js'
            });
            this.$el.append(googlePlusButtonScript);

            //  Is there a better way to detect these scripts having loaded?
            setTimeout(function () {
                this.socialView.$el.removeClass('loading');

                //  Wrap in a set timeout to let the css3 transition start before removing it's effect.
                setTimeout(function () {
                    //  Change the transition to 0 so on-hover can fade-in to 1.0 instantly and back.
                    this.socialView.$el.css('transition', 'opacity 0s');
                }.bind(this));
            }.bind(this), 3000);
        }

    });

    return new BodyView();
});