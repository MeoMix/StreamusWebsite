import { CollectionView } from 'marionette';
import styles from './faqItems.css';
import FaqItemView from './faqItemView.js';
import FaqType from './faqType.js';

export default CollectionView.extend({
  tagName: 'ul',
  className: styles.faqItems,
  childView: FaqItemView,

  _type: FaqType.None,

  initialize(options) {
    this._type = options.type;
  },

  filter(faqItem) {
    return faqItem.get('type') === this._type;
  }
});