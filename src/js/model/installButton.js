define(function(require) {
    'use strict';

    var utility = require('utility');

    var InstallButton = Backbone.Model.extend({
        defaults: {
            enabled: true,
            text: 'Install extension now',
            minimumChromeVersion: 37,
            minimumOperaVersion: 24
        },

        initialize: function() {
            this._ensureValidBrowser();
            this.setInstalledState(Streamus.extensionData.get('installed'));
        },

        reset: function() {
            this.set(this.defaults);
        },
        
        setInstalledState: function(extensionInstalled) {
            if (extensionInstalled) {
                this.set({
                    enabled: false,
                    text: 'Installed'
                });
            }
        },

        _ensureValidBrowser: function() {
            if (utility.isBrowserMobile()) {
                this.set({
                    enabled: false,
                    text: 'Desktop required'
                });
            } else {
                var browserVersion = utility.getBrowserVersion();
                var minimumOperaVersion = this.get('minimumOperaVersion');
                var minimumChromeVersion = this.get('minimumChromeVersion');

                if (utility.isBrowserOpera() && browserVersion < minimumOperaVersion || utility.isBrowserChrome() && browserVersion < minimumChromeVersion) {
                    this.set({
                        enabled: false,
                        text: 'Chrome v' + minimumChromeVersion + '+ or Opera v' + minimumOperaVersion + '+ required'
                    });
                }
            }
        }
    });

    return InstallButton;
});