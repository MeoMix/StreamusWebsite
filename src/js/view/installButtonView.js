define(function () {
    'use function';

    var InstallButtonView = Backbone.View.extend({
        el: $('#installButton'),

        events: {
            'click': 'install'
        },
        
        webstoreUrl: 'https://chrome.google.com/webstore/detail/jbnkffmindojffecdhbbmekbmkkfpmjd',
        operaExtensionId: 'nnmcpagedcgekmljdamaeahfbmmjloho',

        initialize: function () {

            //  http://stackoverflow.com/questions/17129261/detect-mobile-browser-with-javascript-detectmobilebrowsers-returns-false-for-m
            if (window.mobileCheck || screen.width < 768) {
                this.$el.attr('disabled', true).text('Desktop computer required');
                return;
            }

            var browserIsNotChrome = navigator.userAgent.toLowerCase().indexOf('chrome') === -1;
            if (browserIsNotChrome) {
                this.$el.attr('disabled', true).text('Google Chrome or Opera required');
                return;
            }

            //  Check version of Chrome. Streamus requires v32+ currently:
            var majorVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);

            if (majorVersion < 29) {
                this.$el.attr('disabled', true).text('Google Chrome v32+ required. Please update.');
            }

        },

        install: function () {
            if (!this.$el.attr('disabled')) {
                this.$el.attr('disabled', true).text('Installing...');

                if (this._isBrowserOpera()) {
                    opr.addons.installExtension(this.operaExtensionId, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
                } else {
                    chrome.webstore.install(this.webstoreUrl, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
                }
            }
        },
        
        _onInstallSuccess: function() {
            this.$el.text('Installed!');
            this.$el.trigger('installed');
        },
        
        _onInstallError: function(error) {
            //  TODO: It would be nice to know more about where this error message came from / what others could occur.
            if (error == 'User cancelled install') {
                this.$el.attr('disabled', false).text('Install extension now');
            } else {
                this.$el.text('Error: ' + error);
            }
        },
        
        _isBrowserOpera: function() {
            return navigator.userAgent.indexOf(' OPR/') >= 0;  
        },
        
        onInstalled: function(event) {
            this.$el.on('installed', event);
        }
    });
    
    return InstallButtonView;
});