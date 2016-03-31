import { View } from 'marionette';
import template from './link.hbs';
import styles from './link.css';
import Link from './link.js';

const LinkView = View.extend({
  tagName: 'streamus-link',
  className: styles.link,
  template,

  initialize() {
    // Since element already existed, need to append className manually.
    this.el.classList.add(this.className);
  }
});

const registerLinkElement = function() {
  document.registerElement(LinkView.prototype.tagName, {
    prototype: Object.create(HTMLElement.prototype, {
      createdCallback: {
        value() {
          const linkView = new LinkView({
            el: this,
            model: new Link({
              text: this.textContent,
              href: this._getAttribute('href'),
              target: this._getAttribute('target'),
              title: this._getAttribute('title')
            })
          });
          linkView.render();

          this._view = linkView;

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
        value(attributeName) {
          const hasAttribute = this.hasAttribute(attributeName);
          // Use undefined so result plays well with Backbone.Model's defaults if hasAttribute is false.
          let attribute;

          if (hasAttribute) {
            attribute = this.getAttribute(attributeName);
          }

          return attribute;
        }
      }
    })
  });
};

export default LinkView;
export { registerLinkElement };