import { View } from 'marionette';
import template from './input.hbs';
import styles from './input.css';
import Input from './input.js';
import InputType from './inputType.js';
import { parseInt } from 'lodash';

const InputView = View.extend({
  tagName: 'streamus-input',
  className: styles.input,
  template,
  templateContext: {
    styles
  },

  ui: {
    input: 'input',
    characterCount: 'characterCount'
  },

  events: {
    'input': '_onInput',
    'focus @ui.input': '_onFocusInput',
    'blur @ui.input': '_onBlurInput'
  },

  modelEvents: {
    'change:value': '_onChangeValue',
    'change:isValid': '_onChangeIsValid'
  },

  initialize() {
    // Since element already existed, need to append className manually.
    this.el.classList.add(this.className);
    this.el.classList.toggle(styles.hasValue, this.model.hasValue());
    this.el.classList.toggle(styles.hasFocus, this.model.get('isAutofocused'));
  },

  onAttach() {
    if (this.model.get('isMultiline') && this.model.hasValue()) {
      this._setMultilineHeight(false);
    }

    if (this.model.get('isAutofocused')) {
      this.ui.input[0].focus();
    }
  },

  validate() {
    this.el.classList.toggle(styles.isInvalid, !this.model.get('isValid'));
  },

  _onInput() {
    this.model.set('value', this.ui.input.val());
  },

  _onFocusInput() {
    this.el.classList.add(styles.hasFocus);
  },

  _onBlurInput() {
    this.el.classList.remove(styles.hasFocus);
    this.el.classList.toggle(styles.isInvalid, !this.model.get('isValid'));
  },

  _onChangeValue(model, value) {
    this.ui.characterCount.text(value.length);
    this.el.classList.toggle(styles.hasValue, model.hasValue());
    // TODO: Is this necessary? Doesn't the subelement return it?
    // Be sure to record value on the element so $.val() and .value will yield proper values.
    this.el.value = value;

    if (model.get('isMultiline')) {
      // If height is not set to 'auto' then input will not shrink on text deletion.
      this._setMultilineHeight(model.previous('value').length > value.length);
    }
  },

  _onChangeIsValid(model, isValid) {
    this.el.classList.toggle(styles.isInvalid, !isValid);
  },

  _setMultilineHeight(isShrinking) {
    // If height is not set to 'auto' then input will not shrink on text deletion.
    if (isShrinking) {
      this.ui.input.height('auto');
    }

    this.ui.input.innerHeight(this.ui.input[0].scrollHeight);
  }
});

const registerInputElement = function() {
  document.registerElement(InputView.prototype.tagName, {
    prototype: Object.create(HTMLElement.prototype, {
      createdCallback: {
        value() {
          const type = this._getAttribute('type');

          const inputView = new InputView({
            el: this,
            model: new Input({
              placeholder: this._getAttribute('placeholder'),
              name: this._getAttribute('name'),
              isRequired: this.hasAttribute('required'),
              isMultiline: this.hasAttribute('multiline'),
              isAutofocused: this.hasAttribute('autofocus'),
              value: this._getAttribute('value', type === InputType.Number),
              maxLength: this._getAttribute('maxLength', true),
              min: this._getAttribute('min', true),
              max: this._getAttribute('max', true),
              type
            })
          });
          inputView.render();

          this._view = inputView;
          this.validate = inputView.validate.bind(inputView);

          // Polyfill is async; dispatch event to allow App to know when async work has completed.
          if (!window.CustomElements.hasNative) {
            // Notify views which rendered this webcomponent that their HTML markup has changed.
            this.dispatchEvent(new Event('customElement:created', {
              bubbles: true
            }));
          }
        }
      },

      attachedCallback: {
        value() {
          this._view.triggerMethod('attach');
        }
      },

      detachedCallback: {
        value() {
          this._view.destroy();
          delete this._view;
        }
      },

      _getAttribute: {
        value(attributeName, parseAsInteger) {
          const hasAttribute = this.hasAttribute(attributeName);
          // Use undefined so result plays well with Backbone.Model's defaults if hasAttribute is false.
          let attribute;

          if (hasAttribute) {
            attribute = this.getAttribute(attributeName);

            if (parseAsInteger) {
              attribute = parseInt(attribute);
            }
          }

          return attribute;
        }
      }
    })
  });
};

export default InputView;
export { registerInputElement };