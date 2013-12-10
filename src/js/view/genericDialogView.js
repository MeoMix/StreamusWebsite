define([
    'text!template/genericDialog.html'
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
            //  Whenever Bootstrap Modals are destroyed in FireFox -- need to wait until the stack has cleared before cleaning up.
            //  Otherwise, the overlay sticks around and makes all the elements non-interactive.
            this.listenTo(this.model, 'destroy', function() {
                _.defer(this.remove.bind(this));
            });
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