define(function() {
    'use strict';

    var NavigationItemView = Marionette.ItemView.extend({
        template: false,

        events: {
            'click': '_onClick'
        },

        modelEvents: {
            'change:hidden': '_onChangeHidden'
        },

        onRender: function() {
            var hidden = this.model.get('hidden');
            this._setActiveClass(!hidden);
        },

        _onClick: function() {
            this._navigateToRoute(this.model.get('route'));
        },

        _onChangeHidden: function(model, hidden) {
            this._setActiveClass(!hidden);
        },

        _setActiveClass: function(active) {
            this.$el.toggleClass('active', active);
        },

        _navigateToRoute: function(route) {
            Streamus.router.navigate(route, {
                trigger: true
            });
        }
    });

    return NavigationItemView;
});