define(function () {
    'use strict';

    var InstallButton = Backbone.Model.extend({
        defaults: {
            enabled: true,
            text: 'Install extension now'
        },
        
        initialize: function () {
            this._ensureValidBrowser();
        },
        
        reset: function () {
            this.set(this.defaults);
        },
        
        isBrowserOpera: function() {
            return $.browser.opr;
        },
        
        isBrowserChrome: function () {
            return $.browser.chrome;
        },
        
        _ensureValidBrowser: function() {
            if ($.browser.mobile) {
                this.set({
                    enabled: false,
                    text: 'Desktop required'
                });
            } else {
                var browserVersion = $.browser.version;

                if (this.isBrowserOpera() && browserVersion < 24 || this.isBrowserChrome() && $.browser.version < 37) {
                    this.set({
                        enabled: false,
                        text: 'Chrome v37+ or Opera v24+ required'
                    });
                }
            }
        }
    });

    return InstallButton;
});