define(function(require) {
    'use strict';

    var DialogTemplate = require('text!template/dialog.html');

    var DialogView = Marionette.LayoutView.extend({
        className: 'modal fade',
        template: _.template(DialogTemplate),

        attributes: {
            tabindex: '-1',
            role: 'dialog',
            'aria-labelledby': 'dialog-title',
            'aria-hidden': 'true'
        },

        events: {
            'hidden.bs.modal': '_onHidden'
        },

        regions: {
            contentRegion: '.contentRegion'
        },

        onRender: function() {
            this.contentRegion.show(this.contentView);
            this.$el.modal();
        },

        _onHidden: function() {
            this.remove();
        }
    });

    return DialogView;
});