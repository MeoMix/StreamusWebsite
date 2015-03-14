define(function () {
    'use strict';

    var Hidable = Marionette.Behavior.extend({
        modelEvents: {
            'change:hidden': '_onChangeHidden'
        },

        initialize: function () {
            //  TODO: I don't like going through this.view.options.model.
            Streamus.pages.add(this.view.options.model);
        },
        
        _onChangeHidden: function (model, hidden) {
            this.$el.toggle(!hidden);
        }
    });

    return Hidable;
});