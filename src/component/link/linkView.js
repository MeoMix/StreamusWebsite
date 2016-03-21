import { LayoutView } from 'marionette';
import template from './link.hbs';
import styles from './link.css';
import Link from './link.js';
import { extend } from 'lodash';

const LinkView = LayoutView.extend({
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
    prototype: extend(Object.create(HTMLElement.prototype), {
      createdCallback() {
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
      },

      attachedCallback() {
        this._view.triggerMethod('attach');
      },

      detachedCallback() {
        this._view.destroy();
        delete this._view;
      },

      _getAttribute(attributeName) {
        const hasAttribute = this.hasAttribute(attributeName);
        // Use undefined so result plays well with Backbone.Model's defaults if hasAttribute is false.
        let attribute;

        if (hasAttribute) {
          attribute = this.getAttribute(attributeName);
        }

        return attribute;
      }
    })
  });
};

export default LinkView;
export { registerLinkElement };