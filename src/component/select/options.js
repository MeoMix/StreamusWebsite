import { Collection } from 'backbone';
import Option from './option.js';
import { result } from 'lodash';

export default Collection.extend({
  model: Option,

  initialize() {
    // TODO: Ensure at least one model is selected.
    this.on('change:isSelected', this._onChangeIsSelected);
  },

  _onChangeIsSelected(model, isSelected) {
    if (isSelected) {
      // Ensure only one option can be selected
      this.each((option) => {
        if (option !== model && option.get('isSelected')) {
          option.set('isSelected', false);
        }
      });
    }
  },

  hasValue() {
    return this.getValue() !== result(Option.prototype, 'defaults').value;
  },

  getValue() {
    return this.findWhere({ isSelected: true }).get('value');
  }
});