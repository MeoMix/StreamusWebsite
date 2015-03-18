define(function(require) {
    'use strict';
    
    var utility = require('utility');
    
    var ExtensionData = Backbone.Model.extend({
        defaults: {
            id: null,
            chromeId: 'jbnkffmindojffecdhbbmekbmkkfpmjd',
            operaId: 'nnmcpagedcgekmljdamaeahfbmmjloho',
            installed: false
        },
        
        initialize: function() {
            this._setIsInstalled();
        },
        
        //  Attempt to ping Streamus Chrome Extension. If a response is received then it is known to be installed.
        _setIsInstalled: function() {
            var extensionId = '';

            if (utility.isBrowserChrome()) {
                extensionId = this.get('chromeId');
            }
            else if (utility.isBrowserOpera) {
                extensionId = this.get('operaId');
            }

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