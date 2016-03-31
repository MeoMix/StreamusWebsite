import { CollectionView } from 'marionette';
import styles from './navigationItems.css';
import NavigationItemView from './navigationItemView.js';
import { isUndefined } from 'lodash';

export default CollectionView.extend({
  tagName: 'ul',
  className: styles.navigationItems,
  template: false,
  childView: NavigationItemView,

  _isHorizontal: false,
  _isSecondary: false,

  initialize(options = {}) {
    this._isHorizontal = isUndefined(options.isHorizontal) ? this._isHorizontal : options.isHorizontal;
    this._isSecondary = isUndefined(options.isSecondary) ? this._isSecondary : options.isSecondary;

    // Navigation items will be displayed in two locations: navigationDrawer and header.
    // The header displays the items horizontally. NavigationDrawer displays them vertically.
    if (options.isHorizontal) {
      this.el.classList.add(styles.isHorizontal);
    }
  },

  filter(navigationItem) {
    const isSecondary = navigationItem.get('isSecondary');
    return this._isSecondary ? isSecondary : !isSecondary;
  }
});