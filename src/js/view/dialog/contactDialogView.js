define(function(require) {
    'use strict';

    var Dialog = require('model/dialog');
    var DialogView = require('view/dialog/dialogView');
    var ContactView = require('view/dialog/contactView');

    var ContactDialogView = DialogView.extend({
        initialize: function() {
            this.model = new Dialog({
                title: 'Contact'
            });

            this.contentView = new ContactView();
        }
    });

    return ContactDialogView;
});