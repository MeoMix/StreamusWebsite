import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    text: '',
    href: '',
    target: '',
    title: ''
  }
});