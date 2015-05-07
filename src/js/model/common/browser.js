define(function() {
    'use strict';

    var Browser = Backbone.Model.extend({
        defaults: {
            isMobile: $.browser.mobile || false,
            isOpera: $.browser.opr || false,
            isChrome: $.browser.chrome || false,
            isWebKit: $.browser.chrome || $.browser.opr || false,
            version: $.browser.version
        }
    });

    return Browser;
});