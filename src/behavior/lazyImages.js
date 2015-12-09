import { Behavior } from 'marionette';
import 'jquery.unveil';

// Lazy load images which are not currently in the viewport to save on bandwidth.
export default Behavior.extend({
  ui: {
    lazyImage: 'lazyImage'
  },

  onRender() {
    // Set image src 200px before they scroll into the viewport to give a chance to load.
    this.ui.lazyImage.unveil(200);
  }
});