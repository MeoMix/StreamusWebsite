define(function(require) {
    'use strict';

    var Dialog = require('model/dialog');
    var DialogView = require('view/dialog/dialogView');
    var PrivacyView = require('view/dialog/privacyView');

    var PrivacyDialogView = DialogView.extend({
        initialize: function() {
            this.model = new Dialog({
                title: 'Privacy'
            });

            this.contentView = new PrivacyView();
        }
    });

    return PrivacyDialogView;
});