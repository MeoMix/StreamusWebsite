import { Collection } from 'backbone';
import FaqItem from './faqItem.js';

export default Collection.extend({
  model: FaqItem,

  initialize() {
    this.on('change:isActive', this._onChangeIsActive);
  },

  _onChangeIsActive(model, isActive) {
    if (isActive) {
      // Ensure only one faqItem can be active
      this.each((faqItem) => {
        if (faqItem !== model && faqItem.get('isActive')) {
          faqItem.set('isActive', false);
        }
      });
    }
  }
});