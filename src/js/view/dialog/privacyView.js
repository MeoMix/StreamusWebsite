define(function (require) {
    'use strict';

    var PrivacyTemplate = require('text!template/privacy.html');

    var PrivacyView = Marionette.ItemView.extend({
        template: _.template(PrivacyTemplate)
    });

    return PrivacyView;
});