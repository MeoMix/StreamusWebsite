define(function(require) {
    'use strict';

    var HeaderRegion = require('view/header/headerRegion');
    var FooterRegion = require('view/footer/footerRegion');
    var SocialRegion = require('view/social/socialRegion');
    var DialogRegion = require('view/dialog/dialogRegion');

    var BodyView = Marionette.LayoutView.extend({
        el: 'body',
        template: false,

        regions: {
            headerRegion: {
                selector: '.headerRegion',
                regionClass: HeaderRegion
            },
            contentRegion: '.contentRegion',
            footerRegion: {
                selector: '.footerRegion',
                regionClass: FooterRegion
            },
            socialRegion: {
                selector: '.socialRegion',
                regionClass: SocialRegion
            },
            dialogRegion: {
                selector: '.dialogRegion',
                regionClass: DialogRegion
            }
        },

        initialize: function() {
            this.listenTo(Streamus.channels.body.commands, 'showIn:region', this._showInRegion);
        },

        onRender: function() {
            //  Announce the body has been rendered so don't have to explicitly tell every region to load its contents.
            Streamus.channels.body.vent.trigger('rendered');
            this.$el.removeClass('is-hidden');
        },

        _showInRegion: function(view) {
            this.contentRegion.show(view);
        }
    });

    return BodyView;
});