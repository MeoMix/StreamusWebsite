import { View } from 'marionette';
import template from './card.hbs';
import styles from './card.css';
import Card from './card.js';

const CardView = View.extend({
  tagName: 'streamus-card',
  className: styles.card,
  template,
  templateContext() {
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
  document.registerElement(CardView.prototype.tagName, {
    prototype: Object.create(HTMLElement.prototype, {
      createdCallback: {
        value() {
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

      _getElementHtml: {
        value(tagName) {
          const element = this.getElementsByTagName(`card-${tagName}`)[0];
          return element ? element.innerHTML : '';
        }
      }
    })
  });
};

export default CardView;
export { registerCardElement };