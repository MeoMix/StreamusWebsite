define(function(require) {
    'use function';

    var RouteType = require('enum/routeType');
    var Button = require('view/behavior/button');
    var Browser = require('model/common/browser');

    var InstallButtonView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'installButton btn btn-lg btn-success',
        template: false,

        behaviors: {
            Button: {
                behaviorClass: Button
            }
        },

        initialize: function() {
            this.listenTo(Streamus.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
        },

        onClick: function() {
            this._install();
        },

        _onExtensionDataChangeInstalled: function(model, installed) {
            this.model.setInstalledState(installed);
        },

        _install: function() {
            this.model.set({
                enabled: false,
                text: 'Installing...'
            });

            var browser = new Browser();

            if (browser.get('isOpera')) {
                var operaExtensionId = Streamus.extensionData.get('operaId');
                opr.addons.installExtension(operaExtensionId, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
            } else {
                var chromeWebstoreUrl = 'https://chrome.google.com/webstore/detail/' + Streamus.extensionData.get('chromeId');
                chrome.webstore.install(chromeWebstoreUrl, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
            }
        },

        _onInstallSuccess: function() {
            this.model.set('text', 'Installed');

            Streamus.extensionData.markAsInstalled();

            //  Take the user to the GettingStarted page if they're on Home when installing because that will help them learn to use the program.
            //  In other parts of the website, it's bad UX to force them away from what they were reading.
            if (Backbone.history.fragment === RouteType.Home) {
                Streamus.router.navigate(RouteType.GettingStarted, {
                    trigger: true
                });
            }

            Streamus.analyticsManager.trackEvent('Extension', 'InstallSuccess');
        },

        _onInstallError: function(error) {
            if (error === 'User cancelled install') {
                this.model.reset();
            } else {
                this.model.set({
                    text: 'Error: ' + error
                });
                Streamus.analyticsManager.trackEvent('Extension', 'InstallError', error);
            }
        }
    });

    return InstallButtonView;
});