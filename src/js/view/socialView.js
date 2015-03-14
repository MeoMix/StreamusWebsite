﻿define(function (require) {
    'use strict';

    var SocialTemplate = require('text!template/social.html');

    var SocialView = Marionette.ItemView.extend({
        tagName: 'aside',
        className: 'social',
        template: _.template(SocialTemplate),

        onAttach: function () {
            //  TODO: Why doesn't this work with just a _.defer?
            //  I don't think there's a great way to detect the above scripts having all loaded successfully.
            //  Fade in after a second so that it doesn't detract from the rest of the page.
            setTimeout(function () {
                this.$el.addClass('is-loaded');
            }.bind(this), 1000);
            
            //  Scripts can't be added through a template because Marionette will not run their logic.
            this.$el.append('<script src="//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252"></script>');
            this.$el.append('<script src="//platform.twitter.com/widgets.js"></script>');
            this.$el.append('<script src="//apis.google.com/js/plusone.js"></script>');
        }
    });

    return SocialView;
});