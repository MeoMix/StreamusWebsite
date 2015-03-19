define(function(require) {
    'use strict';

    var NotFoundTemplate = require('text!template/notFound.html');

    var NotFoundView = Marionette.ItemView.extend({
        className: 'error',
        template: _.template(NotFoundTemplate)
    });

    return NotFoundView;
});