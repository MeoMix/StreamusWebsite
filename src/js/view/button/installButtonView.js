define(function(require) {
    'use function';

    var Route = require('enum/route');
    var Button = require('view/behavior/button');
    var utility = require('utility');

    var InstallButtonView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'installButton btn btn-lg btn-success',
        template: false,

        events: {
            'click': '_onClick'
        },
        
        behaviors: {
            Button: {
                behaviorClass: Button
            }
        },
        
        initialize: function() {
            this.listenTo(Streamus.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
        },

        _onClick: function() {
            this._install();
        },
        
        _onExtensionDataChangeInstalled: function(model, installed) {
            this.model.setInstalledState(installed);
        },

        _install: function() {
            if (!this.model.get('disabled')) {
                this.model.set({
                    enabled: false,
                    text: 'Installing...'
                });

                if (utility.isBrowserOpera()) {
                    opr.addons.installExtension(Streamus.extensionData.get('operaId'), this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
                } else {
                    var chromeWebstoreUrl = 'https://chrome.google.com/webstore/detail/' + Streamus.extensionData.get('chromeId');
                    chrome.webstore.install(chromeWebstoreUrl, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
                }
            }
        },

        _onInstallSuccess: function() {
            this.model.set('text', 'Installed');
            Streamus.extensionData.set('installed', true);
            Streamus.router.navigate(Route.GettingStarted, { trigger: true });
        },

        _onInstallError: function(error) {
            if (error === 'User cancelled install') {
                this.model.reset();
            } else {
                this.model.set({
                    text: 'Error: ' + error
                });
            }
        }
    });

    return InstallButtonView;
});