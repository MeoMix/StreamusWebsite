import { Collection } from 'backbone';
import SimpleMenuItem from './simpleMenuItem';

export default Collection.extend({
  model: SimpleMenuItem,

  initialize() {
    this.on('change:active', this._onChangeActive);
  },

  getActive() {
    return this.findWhere({
      active: true
    });
  },

  // Enforce that only one model can be active at a time by deactivating all other models when one becomes active.
  _onChangeActive(model, active) {
    if (active) {
      this._deactivateAllExcept(model);
    }
  },

  // Ensure only one menu item can be active at a time.
  _deactivateAllExcept(changedModel) {
    this.each((model) => {
      if (model !== changedModel) {
        model.set('active', false);
      }
    });
  }
});