import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    shareCode: null
  },

  reset() {
    this.set(this.defaults);
  }
});