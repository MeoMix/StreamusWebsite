import { Model } from 'backbone';
import { result } from 'lodash';

export default Model.extend({
  defaults: {
    header: {
      title: '',
      subtitle: ''
    },
    content: '',
    richMedia: '',
    actions: ''
  },

  hasHeader() {
    const header = this.get('header');
    const defaults = result(this, 'defaults');
    return header.title !== defaults.header.title || header.subtitle !== defaults.header.subtitle;
  },

  hasContent() {
    const defaults = result(this, 'defaults');
    return this.get('content') !== defaults.content;
  },

  hasRichMedia() {
    const defaults = result(this, 'defaults');
    return this.get('richMedia') !== defaults.richMedia;
  },

  hasActions() {
    const defaults = result(this, 'defaults');
    return this.get('actions') !== defaults.actions;
  }
});