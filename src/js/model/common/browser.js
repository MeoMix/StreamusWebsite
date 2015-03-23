define(function() {
    'use strict';

    var BrowserData = Backbone.Model.extend({
        defaults: {
            isMobile: $.browser.mobile,
            isOpera: $.browser.opr,
            isChrome: $.browser.chrome,
            version: $.browser.version
        }
    });

    return BrowserData;
});