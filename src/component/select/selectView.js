import { LayoutView } from 'marionette';
import template from './select.hbs';
import styles from './select.css';
import Select from './select.js';
import Options from './options.js';
import SimpleMenuItems from '../simpleMenu/simpleMenuItems.js';
import SimpleMenu from '../simpleMenu/simpleMenu.js';
import SimpleMenuView from '../simpleMenu/simpleMenuView.js';
import { isUndefined, extend } from 'lodash';

const SelectView = LayoutView.extend({
  tagName: 'streamus-select',
  className: styles.select,
  template,
  templateHelpers: {
    styles
  },

  regions: {
    simpleMenu: 'simpleMenu'
  },

  ui: {
    value: 'value'
  },

  events: {
    'click @ui.value': '_onClickValue'
  },

  initialize() {
    // Since element already existed, need to append className manually.
    this.el.classList.add(this.className);
    this.el.classList.toggle(styles.hasValue, this.model.hasValue());
    this.listenTo(this.model.get('options'), 'change:isSelected', this._onOptionsChangeIsSelected);
  },

  onRender() {
    const selectedOption = this.model.get('options').findWhere({ isSelected: true });
    this.ui.value.text(selectedOption.get('label'));
  },

  _onClickValue() {
    this._openSimpleMenu();
  },

  _onOptionsChangeIsSelected() {
    const selectedOption = this.model.get('options').findWhere({ isSelected: true });
    this.el.classList.toggle(styles.hasValue, this.model.hasValue());
    // Be sure to record value on the element so $.val() and .value will yield proper values.
    this.el.value = this.model.get('options').getValue();

    if (selectedOption) {
      this.ui.value.text(selectedOption.get('label'));
    }
  },

  _openSimpleMenu() {
    // If the list item is clicked while the menu is open do not re-open it.
    if (isUndefined(this.getChildView('simpleMenu'))) {
      const simpleMenuItems = new SimpleMenuItems(this.model.get('options').map((option) => {
        return {
          active: option.get('isSelected'),
          text: option.get('label'),
          value: option.get('value'),
          onClick() {
            option.set('isSelected', true);
          }
        };
      }));

      this.showChildView('simpleMenu', new SimpleMenuView({
        model: new SimpleMenu({
          simpleMenuItems,
          listItemHeight: this.$el.height()
        })
      }));
    }
  }
});

const registerSelectElement = function() {
  document.registerElement('streamus-select', {
    prototype: extend(Object.create(HTMLElement.prototype), {
      createdCallback() {
        const selectView = new SelectView({
          el: this,
          model: new Select({
            placeholder: this._getAttribute('placeholder'),
            name: this._getAttribute('name'),
            options: this._getOptions()
          })
        });
        selectView.render();

        this._view = selectView;
      },

      attachedCallback() {
        this._view.triggerMethod('attach');
      },

      detachedCallback() {
        this._view.destroy();
        delete this._view;
      },

      _getOptions() {
        const optionsDataList = Array.from(this.children).map((optionElement) => {
          let label = this._getAttribute('label', optionElement);

          if (isUndefined(label)) {
            label = optionElement.textContent;
          }

          return {
            label,
            value: this._getAttribute('value', optionElement),
            isSelected: optionElement.hasAttribute('selected'),
            isDisabled: optionElement.hasAttribute('disabled')
          };
        });

        return new Options(optionsDataList);
      },

      _getAttribute(attributeName, element = this) {
        const hasAttribute = element.hasAttribute(attributeName);
        // Use undefined so result plays well with Backbone.Model's defaults if hasAttribute is false.
        let attribute;

        if (hasAttribute) {
          attribute = element.getAttribute(attributeName);
        }

        return attribute;
      }
    })
  });
};

export default SelectView;
export { registerSelectElement };