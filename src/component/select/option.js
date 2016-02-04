import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    label: '',
    value: '',
    isSelected: false,
    isDisabled: false
  }
});