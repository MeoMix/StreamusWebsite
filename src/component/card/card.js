import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    header: {
      title: '',
      subtitle: ''
    },
    content: '',
    richMedia: '',
    actions: ''
  }
});