import { View } from 'marionette';
import template from './faqItem.hbs';
import styles from './faqItem.css';

export default View.extend({
  tagName: 'li',
  id() {
    return this.model.get('id');
  },
  className: styles.faqItem,
  template,
  templateContext: {
    styles
  },

  ui: {
    header: 'header',
    description: 'description'
  },

  events: {
    'click @ui.header': '_onClickHeader'
  },

  modelEvents: {
    'change:isActive': '_onChangeIsActive'
  },

  onRender() {
    if (this.model.get('isActive')) {
      this.el.classList.add(styles.isActive);
    } else {
      this.$el.height(48);
    }
  },

  onAttach() {
    // TODO: Wait for all items in collectionview to render before measuring since flex height changes as items add.
    setTimeout(() => {
      if (this.model.get('isActive')) {
        this.$el.height(this.ui.description.outerHeight(true) + 48);
      }
    }, 100);
  },

  _onClickHeader() {
    this.model.set('isActive', !this.model.get('isActive'));
  },

  _onChangeIsActive(model, isActive) {
    if (isActive) {
      this.el.classList.add(styles.isActive);
      this.$el.height(this.ui.description.outerHeight(true) + 48);
    } else {
      this.el.classList.remove(styles.isActive);
      this.$el.height(48);
    }
  }
});