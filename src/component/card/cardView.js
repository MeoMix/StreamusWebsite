import { LayoutView } from 'marionette';
import template from './card.hbs';
import styles from './card.css';
import Card from './card.js';
import { extend } from 'lodash';

const CardView = LayoutView.extend({
  tagName: 'streamus-card',
  className: styles.card,
  template,
  templateHelpers() {
    return {
      styles,
      hasHeader: this.model.hasHeader(),
      hasContent: this.model.hasContent(),
      hasRichMedia: this.model.hasRichMedia(),
      hasActions: this.model.hasActions()
    };
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
            header: {
              title: this._getElementHtml('title'),
              subtitle: this._getElementHtml('subtitle')
            },
            content: this._getElementHtml('content'),
            richMedia: this._getElementHtml('richMedia'),
            actions: this._getElementHtml('actions')
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
      },

      _getElementHtml(tagName) {
        const element = this.getElementsByTagName(`card-${tagName}`)[0];
        return element ? element.innerHTML : '';
      }
    })
  });
};

export default CardView;
export { registerCardElement };