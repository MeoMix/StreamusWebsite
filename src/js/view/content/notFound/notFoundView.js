define(function(require) {
    'use strict';

    var NotFoundTemplate = require('text!template/content/notFound.html');

    var NotFoundView = Marionette.LayoutView.extend({
        className: 'notFound content',
        template: _.template(NotFoundTemplate)
    });

    return NotFoundView;
});