define(function(require) {
    'use strict';

    var ContactTemplate = require('text!template/dialog/contact.html');

    var ContactView = Marionette.ItemView.extend({
        template: _.template(ContactTemplate)
    });

    return ContactView;
});