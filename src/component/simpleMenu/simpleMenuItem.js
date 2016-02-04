import { Model } from 'backbone';
import FixedPosition from './fixedPosition';

export default Model.extend({
  defaults: {
    text: '',
    value: null,
    active: false,
    disabled: false,
    fixedPosition: FixedPosition.None,
    onClick() {}
  }
});