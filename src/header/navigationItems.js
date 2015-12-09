import { Collection } from 'backbone';
import NavigationItem from './navigationItem';

export default Collection.extend({
  model: NavigationItem,

  initialize() {
    this.on('change:active', this._onChangeActive);
  },

  _onChangeActive(model, active) {
    if (active) {
      this._deactiveAllExcept(model);
    }
  },

  // Ensure only one model in the collection can be active at a time.
  _deactiveAllExcept(activeModel) {
    this.each((model) => {
      if (model !== activeModel) {
        model.set('active', false);
      }
    });
  }
});