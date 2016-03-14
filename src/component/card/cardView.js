import { LayoutView } from 'marionette';
import template from './card.hbs';
import styles from './card.css';
import Card from './card.js';
import { extend } from 'lodash';

const CardView = LayoutView.extend({
  tagName: 'streamus-card',
  className: styles.card,
  template,
  templateHelpers: {
    styles
  },

  initialize() {
    // Since element already existed, need to append className manually.
    this.el.classList.add(this.className);
  }
});

const registerCardElement = function() {
  document.registerElement('streamus-card', {
    prototype: extend(Object.create(HTMLElement.prototype), {
      createdCallback() {
        const cardView = new CardView({
          el: this,
          model: new Card({
            primaryTitle: this.getElementsByTagName('primaryTitle')[0].textContent,
            supportingText: this.getElementsByTagName('supportingText')[0].textContent,
            richMedia: this.getElementsByTagName('richMedia')[0].innerHTML
          })
        });
        cardView.render();

        this._view = cardView;
      },

      attachedCallback() {
        this._view.triggerMethod('attach');
      },

      detachedCallback() {
        this._view.destroy();
        delete this._view;
      }
    })
  });
};

export default CardView;
export { registerCardElement };