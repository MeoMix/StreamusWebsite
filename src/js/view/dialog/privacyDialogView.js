define(function(require) {
    'use strict';

    var DialogView = require('view/dialog/dialogView');
    var PrivacyView = require('view/dialog/privacyView');

    var PrivacyDialogView = DialogView.extend({
        contentViewClass: PrivacyView,
        modelOptions: {
            title: 'Privacy'
        }
    });

    return PrivacyDialogView;
});