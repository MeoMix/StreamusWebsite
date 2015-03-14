define(function(require) {
    'use strict';

    var Page = require('model/page');

    var Pages = Backbone.Collection.extend({
        model: Page,

        initialize: function() {
            this.on('change:hidden', this._onChangeHidden);
        },

        _onChangeHidden: function(model, hidden) {
            if (!hidden) {
                this._hideAllExcept(model);
            }
        },

        _hideAllExcept: function(shownModel) {
            this.each(function(model) {
                if (model !== shownModel) {
                    model.set('hidden', true);
                }
            });
        }
    });

    return Pages;
});