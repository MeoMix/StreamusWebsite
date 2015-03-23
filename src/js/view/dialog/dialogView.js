define(function(require) {
    'use strict';

    var Dialog = require('model/dialog/dialog');
    var DialogTemplate = require('text!template/dialog/dialog.html');

    var DialogView = Marionette.LayoutView.extend({
        className: 'modal fade',
        template: _.template(DialogTemplate),

        events: {
            'hidden.bs.modal': '_onHidden'
        },

        regions: {
            contentRegion: '.contentRegion'
        },

        contentViewClass: null,
        modelOptions: null,

        initialize: function() {
            this.model = new Dialog(this.modelOptions);
        },

        onRender: function() {
            var contentView = new this.contentViewClass();
            this.contentRegion.show(contentView);

            this.$el.modal();
        },

        _onHidden: function() {
            this.remove();
        }
    });

    return DialogView;
});