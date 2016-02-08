import { Collection } from 'backbone';
import NavigationItem from './navigationItem.js';

export default Collection.extend({
  model: NavigationItem,

  initialize() {
    this.on('change:isActive', this._onChangeIsActive);
  },

  _onChangeIsActive(model, isActive) {
    if (isActive) {
      this._deactivateAllExcept(model);
    }
  },

  // Ensure only one model in the collection can be active at a time.
  _deactivateAllExcept(activeModel) {
    this.each((model) => {
      if (model !== activeModel) {
        model.set('isActive', false);
      }
    });
  }
});