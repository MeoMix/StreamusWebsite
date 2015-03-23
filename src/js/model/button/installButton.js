define(function(require) {
    'use strict';

    var Browser = require('model/common/browser');

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
            var browser = new Browser();

            //  Can't install Streamus on mobile browsers.
            if (browser.get('isMobile')) {
                this.set({
                    enabled: false,
                    text: 'Desktop required'
                });
            } else {
                //  Can't install Streamus on non-webkit browsers nor non-current webkit browsers.
                var minimumOperaVersion = this.get('minimumOperaVersion');
                var minimumChromeVersion = this.get('minimumChromeVersion');
                var isInvalidOperaVersion = browser.get('isOpera') && browser.get('version') < minimumOperaVersion;
                var isInvalidChromeVersion = browser.get('isChrome') && browser.get('version') < minimumChromeVersion;

                if (isInvalidOperaVersion || isInvalidChromeVersion) {
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