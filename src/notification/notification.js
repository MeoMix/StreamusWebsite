import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    message: '',
    isFullyVisible: false,
    hasHidePending: false
  }
});