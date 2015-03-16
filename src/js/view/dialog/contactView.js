define(function(require) {
    'use strict';

    var ContactTemplate = require('text!template/contact.html');

    var ContactView = Marionette.ItemView.extend({
        className: 'text-center',
        template: _.template(ContactTemplate)
    });

    return ContactView;
});