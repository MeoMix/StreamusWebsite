import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    id: null,
    entityType: -1,
    entityId: null,
    shortId: null,
    urlFriendlyEntityTitle: ''
  },

  urlRoot() {
    return `${App.serverUrl}ShareCode/`;
  },

  fetchByShortIdAndEntityTitle(options) {
    // Set the URL to an explicit route before going through fetch so that it won't rely on ID.
    this.url = `${this.urlRoot() + this.get('shortId')}/${this.get('urlFriendlyEntityTitle')}`;
    const request = this.fetch(options);
    // Clear the URL after initiating fetch so that future requests aren't malformed.
    this.url = null;

    return request;
  }
});