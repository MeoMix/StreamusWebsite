define(function(require) {
  'use strict';

  var RouteType = require('enum/routeType');

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

    install: function() {
      this.set({
        enabled: false,
        text: 'Installing...'
      });

      if (Streamus.browser.get('isOpera')) {
        var operaExtensionId = Streamus.extensionData.get('operaId');
        opr.addons.installExtension(operaExtensionId, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
      } else {
        var chromeWebstoreUrl = 'https://chrome.google.com/webstore/detail/' + Streamus.extensionData.get('chromeId');
        chrome.webstore.install(chromeWebstoreUrl, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
      }
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

    _onInstallSuccess: function() {
      this.set('text', 'Installed');
      Streamus.extensionData.markAsInstalled();

      // TODO: Model shouldn't know about the router.
      // Take the user to the GettingStarted page if they're on Home when installing.
      // This forced navigation will take them to instructions on how to use the program.
      // In other parts of the website, it's bad UX to force them away from what they were reading.
      if (Backbone.history.fragment === RouteType.Home) {
        Streamus.router.navigate(RouteType.GettingStarted, {
          trigger: true
        });
      }

      Streamus.analyticsManager.trackEvent('Extension', 'InstallSuccess');
    },

    _onInstallError: function(error) {
      if (error === 'User cancelled install') {
        this.reset();
      } else {
        this.set({
          text: 'Error: ' + error
        });
        Streamus.analyticsManager.trackEvent('Extension', 'InstallError', error);
      }
    },

    _ensureValidBrowser: function() {
      var browser = Streamus.browser;

      // Can't install Streamus on mobile browsers.
      if (browser.get('isMobile')) {
        this.set({
          enabled: false,
          text: 'Desktop required'
        });
      } else {
        // Can't install Streamus on non-webkit browsers nor non-current webkit browsers.
        var minimumOperaVersion = this.get('minimumOperaVersion');
        var minimumChromeVersion = this.get('minimumChromeVersion');
        var isWebKit = browser.get('isWebKit');
        var isInvalidOperaVersion = browser.get('isOpera') && browser.get('version') < minimumOperaVersion;
        var isInvalidChromeVersion = browser.get('isChrome') && browser.get('version') < minimumChromeVersion;

        if (!isWebKit || isInvalidOperaVersion || isInvalidChromeVersion) {
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