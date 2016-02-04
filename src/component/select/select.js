import { Model } from 'backbone';
import Options from './options';

export default Model.extend({
  defaults() {
    return {
      name: '',
      placeholder: '',
      isRequired: false,
      options: new Options()
    };
  },

  hasValue() {
    return this.get('options').hasValue();
  }
});