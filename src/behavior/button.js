import { Behavior } from 'marionette';

export default Behavior.extend({
  events: {
    'click': '_onClick'
  },

  modelEvents: {
    'change:isEnabled': '_onChangeIsEnabled',
    'change:text': '_onChangeText'
  },

  onRender() {
    this._setDisabled(!this.view.options.model.get('isEnabled'));
    this._setText(this.view.options.model.get('text'));
  },

  _onChangeIsEnabled(model, isEnabled) {
    this._setDisabled(!isEnabled);
  },

  _onChangeText(model, text) {
    this.view.$el.text(text);
  },

  _onClick() {
    if (this.view.model.get('isEnabled')) {
      this.view.triggerMethod('click');
    }
  },

  _setDisabled(disabled) {
    this.view.$el.attr('disabled', disabled);
  },

  _setText(text) {
    this.$el.text(text);
  }
});