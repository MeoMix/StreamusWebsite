define(function() {
    'use strict';

    var Routable = Marionette.Behavior.extend({
        modelEvents: {
            'change:hidden': '_onChangeHidden'
        },

        initialize: function() {
            //  TODO: I don't like going through this.view.options.model.
            Streamus.pages.add(this.view.options.model);
        },

        onRender: function() {
            this._setVisibility(this.view.model.get('hidden'));
        },

        _onChangeHidden: function(model, hidden) {
            this._setVisibility(hidden);
        },

        _setVisibility: function(hidden) {
            this.$el.toggleClass('is-hidden', hidden);
        }
    });

    return Routable;
});