define([
    'text!template/genericDialog.htm'
], function (GenericDialogTemplate) {
    'use strict';

    var GenericDialogView = Backbone.View.extend({
        
        className: 'modal container fade',
        
        attributes: {
            tabindex: '-1',
            role: 'dialog',
            'aria-labelledby': 'genericDialogTitle',
            'aria-hidden': 'true'
        },
        
        events: {
            'hidden.bs.modal': 'destroyModel'
        },

        template: _.template(GenericDialogTemplate),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            //  Render subview inside of content to support full HTML mark-up easily.
            this.$el.find('.modal-body').append(this.model.get('body').render().el);

            return this;
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        
        destroyModel: function () {
            this.model.trigger('destroy');
        },
        
        show: function() {
            $('.page-container').append(this.render().el);
            this.$el.modal();
        }

    });

    return GenericDialogView;
});