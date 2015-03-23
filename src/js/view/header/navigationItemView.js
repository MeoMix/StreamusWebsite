define(function(require) {
    'use strict';

    var NavigationItemTemplate = require('text!template/header/navigationItem.html');

    var NavigationItemView = Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template(NavigationItemTemplate),

        modelEvents: {
            'change:active': '_onChangeActive'
        },

        initialize: function() {
            this.listenTo(Streamus.channels.route.vent, 'shown', this._onRouteShown);
        },

        onRender: function() {
            var active = this.model.get('active');
            this._setActiveClass(active);
        },
        
        //  Respond to routes showing to ensure that the proper navigation item is highlighted.
        _onRouteShown: function(routeType, routeData) {
            //  TODO: I just hacked in the Coachella activator here.
            if (routeType === this.model.get('route') || routeData.uriFragment.indexOf('coachella') !== -1 && this.model.get('route').indexOf('coachella') !== -1) {
                this.model.set('active', true);
            }
        },

        _onChangeActive: function(model, active) {
            this._setActiveClass(active);
        },

        _setActiveClass: function(active) {
            this.$el.toggleClass('active', active);
        }
    });

    return NavigationItemView;
});