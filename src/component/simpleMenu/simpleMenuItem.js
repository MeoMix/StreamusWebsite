import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    text: '',
    value: null,
    active: false,
    disabled: false,
    onClick() {}
  }
});