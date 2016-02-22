import { Model } from 'backbone';
import InputType from './inputType.js';
import { result } from 'lodash';

export default Model.extend({
  defaults: {
    placeholder: '',
    // TODO: Value should be a string always and input type=number should respect that.
    value: '',
    name: '',
    errorMessage: '',
    type: InputType.None,
    maxLength: -1,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    isValid: false,
    isRequired: false,
    isMultiline: false,
    showCharacterCount: true
  },

  initialize() {
    this._setIsValid(this.get('value'));
    this.set('showCharacterCount', this.get('type') !== InputType.Number);

    this.on('change:value', this._onChangeValue);
  },

  hasValue() {
    return this.get('value') !== result(this, 'defaults').value;
  },

  _onChangeValue(model, value) {
    this._setIsValid(value);
  },

  _setIsValid(value) {
    let isValid;
    let errorMessage;
    const type = this.get('type');

    switch (type) {
      case InputType.Number:
        ({ isValid, errorMessage } = this._isValidNumber(value));
        break;
      case InputType.Text:
        ({ isValid, errorMessage } = this._isValidText(value));
        break;
      case InputType.Email:
        ({ isValid, errorMessage } = this._isValidEmail(value));
        break;
      default:
        throw new Error(`Unhandled input type: ${type}`);
    }

    this.set({
      isValid,
      errorMessage
    });
  },

  _isValidNumber(value) {
    let isValid = true;
    let errorMessage = '';
    const name = this.get('name');
    const defaults = result(this, 'defaults');

    if (this.get('isRequired') && !this.hasValue()) {
      isValid = false;
      errorMessage = `${name} is required`;
    }

    const min = this.get('min');
    const hasMinValue = min !== defaults.min;
    if (isValid && hasMinValue && value < min) {
      isValid = false;
      errorMessage = `${name} is too small`;
    }

    const max = this.get('max');
    const hasMaxValue = max !== defaults.max;
    if (isValid && hasMaxValue && value > max) {
      isValid = false;
      errorMessage = `${name} is too large`;
    }

    return {
      isValid,
      errorMessage
    };
  },

  _isValidText(value) {
    let isValid = true;
    let errorMessage = '';
    const name = this.get('name');
    const defaults = result(this, 'defaults');

    if (this.get('isRequired') && !this.hasValue()) {
      isValid = false;
      errorMessage = `${name} is required`;
    }

    const maxLength = this.get('maxLength');
    const hasMaxLength = maxLength !== defaults.maxLength;
    if (isValid && hasMaxLength && value.length > maxLength) {
      isValid = false;
      errorMessage = `${name} is too long`;
    }

    return {
      isValid,
      errorMessage
    };
  },

  _isValidEmail(value) {
    let isValid = true;
    let errorMessage = '';
    const name = this.get('name');
    const defaults = result(this, 'defaults');

    // Use the HTML5 email validation RegEx implemented in Webkit.
    // http://stackoverflow.com/a/4940155/633438
    if (this.get('isRequired') && !/[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[A-Za-z0-9-]+(.[A-Za-z0-9-]+)*/.test(value)) {
      isValid = false;
      errorMessage = `Valid ${this.get('name')} is required`;
    }

    const maxLength = this.get('maxLength');
    const hasMaxLength = maxLength !== defaults.maxLength;
    if (isValid && hasMaxLength && value.length > maxLength) {
      isValid = false;
      errorMessage = `${name} is too long`;
    }

    return {
      isValid,
      errorMessage
    };
  }
});