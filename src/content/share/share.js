import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    shareCode: null,
    isLoading: false,
    hasError: false,
    hasPlaylist: false
  }
});