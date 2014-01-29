define(function () {
    'use function';

    var InstallButtonView = Backbone.View.extend({
        el: $('#installButton'),

        events: {
            'click': 'install'
        },
        
        webstoreUrl: 'https://chrome.google.com/webstore/detail/jbnkffmindojffecdhbbmekbmkkfpmjd',

        initialize: function () {

            //  http://stackoverflow.com/questions/17129261/detect-mobile-browser-with-javascript-detectmobilebrowsers-returns-false-for-m
            if (window.mobileCheck || screen.width < 768) {
                this.$el.attr('disabled', true).text('Desktop computer required');
                return;
            }

            var browserIsNotChrome = navigator.userAgent.toLowerCase().indexOf('chrome') === -1;
            if (browserIsNotChrome) {
                this.$el.attr('disabled', true).text('Google Chrome required');
                return;
            }

            //  Check version of Chrome. Streamus requires v29+ currently:
            var majorVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);

            if (majorVersion < 29) {
                this.$el.attr('disabled', true).text('Google Chrome v29+ required. Please update.');
            }

        },

        install: function () {

            if (!this.$el.attr('disabled')) {

                this.$el.attr('disabled', true).text('Installing...');

                var self = this;
                chrome.webstore.install(this.webstoreUrl, function () {
                    self.$el.text('Installed!');
                    self.$el.trigger('installed');
                }, function (error) {
                    //  TODO: It would be nice to know more about where this error message came from / what others could occur.
                    if (error == 'User cancelled install') {
                        self.$el.attr('disabled', false).text('Install extension now');
                    } else {
                        self.$el.text('Error: ' + error);
                    }

                });
            }

        },
        
        onInstalled: function(event) {
            this.$el.on('installed', event);
        }
    });
    
    return InstallButtonView;
});