define(function (require) {
    'use strict';
    
    var Dialog = require('model/dialog');
    var DialogView = require('view/dialog/dialogView');
    var TermsOfUseView = require('view/dialog/termsOfUseView');

    var TermsOfUseDialogView = DialogView.extend({
        initialize: function() {
            this.model = new Dialog({
                title: 'Terms of Use'
            });

            this.contentView = new TermsOfUseView();
        }
    });

    return TermsOfUseDialogView;
});