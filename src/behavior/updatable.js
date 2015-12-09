import { Behavior } from 'marionette';

export default Behavior.extend({
  onUpdate(options) {
    const attributes = options ? options.model.attributes : this.view.model.defaults;
    this.view.model.set(attributes);
  }
});