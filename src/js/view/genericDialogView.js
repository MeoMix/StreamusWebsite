define([
    'text!../../template/genericDialog.htm'
], function (GenericDialogTemplate) {
    'use strict';

    var GenericDialogView = Backbone.View.extend({
        
        className: 'modal fade',
        
        attributes: {
            tabindex: '-1',
            role: 'dialog',
            'aria-labelledby': 'genericDialogTitle',
            'aria-hidden': 'true'
        },
        
        events: {
            'hidden.bs.modal': 'removeView'
        },

        template: _.template(GenericDialogTemplate),

        render: function () {
            this.$el.html(this.template(this.model));
            //  Render subview inside of content to support full HTML mark-up easily.
            this.$el.find('.modal-body').append(this.model.body.render().el);
            return this;
        },

        initialize: function () {
            this.$el.modal();
        },
        
        removeView: function () {
            this.remove();
        }

    });

    return GenericDialogView;
});