define(function(require) {
    'use strict';

    var RouteType = require('enum/routeType');
    var LogoTemplate = require('text!template/header/logo.html');

    var LogoView = Marionette.ItemView.extend({
        tagName: 'a',
        template: _.template(LogoTemplate),
        attributes: {
            href: '/' + RouteType.Home
        }
    });

    return LogoView;
});