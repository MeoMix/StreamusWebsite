import { LayoutView } from 'marionette';
import LazyImages from 'behavior/lazyImages';
import template from './about.hbs!';
import './about.css!';

export default LayoutView.extend({
  className: 'about content',
  template,

  behaviors: {
    LazyImages: {
      behaviorClass: LazyImages
    }
  }
});