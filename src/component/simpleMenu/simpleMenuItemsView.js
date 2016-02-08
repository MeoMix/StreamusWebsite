import { CollectionView } from 'marionette';
import styles from './simpleMenuItems.css';
import SimpleMenuItemView from './simpleMenuItemView.js';

export default CollectionView.extend({
  className: styles.simpleMenuItems,
  childView: SimpleMenuItemView,
  template: false,

  // Adjust the scrollTop of the view to ensure that the active item is shown.
  ensureActiveIsVisible() {
    const activeItem = this.collection.getActive();

    if (activeItem) {
      const activeView = this.children.find((child) => child.model === activeItem);

      // Center element in list if possible.
      const offsetTop = activeView.el.offsetTop;
      const centerHeight = activeView.$el.height() / 2;
      const center = offsetTop - this.$el.innerHeight() / 2 + centerHeight;
      this.el.scrollTop = center;
    }
  },

  // Return information indicating the position of the active model's view in the collection
  getActiveItemOffsetData() {
    const activeItemIndex = this.collection.indexOf(this.collection.getActive());
    const itemHeight = this.children.first().$el.height();
    // Account for the fact that the view could be scrolling to show the child.
    // An offset derived just by index would be insufficient.
    const itemOffset = activeItemIndex * -itemHeight + this.el.scrollTop;

    return {
      itemHeight,
      itemOffset
    };
  }
});