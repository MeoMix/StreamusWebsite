define(function(require) {
    'use strict';

    var DialogView = require('view/dialog/dialogView');
    var ContactView = require('view/dialog/contactView');

    var ContactDialogView = DialogView.extend({
        contentViewClass: ContactView,
        modelOptions: {
            title: 'Contact'
        }
    });

    return ContactDialogView;
});