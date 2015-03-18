define(function() {
    'use strict';

    //  TODO: Consider putting onClick event here, too.
    var Button = Marionette.Behavior.extend({
        modelEvents: {
            'change:enabled': '_onChangeEnabled',
            'change:text': '_onChangeText'
        },
        
        onRender: function() {
            //  TODO: pretty sure I will be able to get this.model in Marionette 3.x
            this._setDisabled(!this.view.options.model.get('enabled'));
            this._setText(this.view.options.model.get('text'));
        },
        
        _onChangeEnabled: function(model, enabled) {
            this._setDisabled(!enabled);
        },

        _onChangeText: function(model, text) {
            this.view.$el.text(text);
        },
        
        _setDisabled: function(disabled) {
            this.view.$el.attr('disabled', disabled);
        },
        
        _setText: function(text) {
            this.$el.text(text);
        }
    });

    return Button;
});