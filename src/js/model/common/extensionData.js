define(function(require) {
    'use strict';

    var Browser = require('model/common/browser');

    var ExtensionData = Backbone.Model.extend({
        defaults: {
            id: null,
            chromeId: 'jbnkffmindojffecdhbbmekbmkkfpmjd',
            operaId: 'nnmcpagedcgekmljdamaeahfbmmjloho',
            installed: false
        },

        initialize: function() {
            this._checkIsInstalled();
        },

        markAsInstalled: function () {
            var extensionId = this._getExtensionId();

            if (extensionId !== '') {
                this.set('installed', true);
                this.set('id', extensionId);
            }
        },

        _getExtensionId: function() {
            var extensionId = '';
            var browser = new Browser();

            if (browser.get('isChrome')) {
                extensionId = this.get('chromeId');
            } else if (browser.get('isOpera')) {
                extensionId = this.get('operaId');
            }

            return extensionId;
        },
        
        //  Attempt to ping Streamus Chrome Extension. If a response is received then it is known to be installed.
        _checkIsInstalled: function () {
            var extensionId = this._getExtensionId();

            if (extensionId !== '') {
                chrome.runtime.sendMessage(extensionId, {
                    message: 'isInstalled'
                }, this._onSendMessageResponse.bind(this, extensionId));
            }
        },

        _onSendMessageResponse: function(extensionId, response) {
            if (response && response.isInstalled) {
                this.set('installed', true);
                this.set('id', extensionId);
            }
        }
    });

    return ExtensionData;
});