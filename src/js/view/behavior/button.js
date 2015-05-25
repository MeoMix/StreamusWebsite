define(function() {
  'use strict';

  var Button = Marionette.Behavior.extend({
    events: {
      'click': '_onClick'
    },

    modelEvents: {
      'change:enabled': '_onChangeEnabled',
      'change:text': '_onChangeText'
    },

    onRender: function() {
      this._setDisabled(!this.view.options.model.get('enabled'));
      this._setText(this.view.options.model.get('text'));
    },

    _onChangeEnabled: function(model, enabled) {
      this._setDisabled(!enabled);
    },

    _onChangeText: function(model, text) {
      this.view.$el.text(text);
    },

    _onClick: function() {
      if (!this.view.model.get('disabled')) {
        this.view.triggerMethod('click');
      }
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