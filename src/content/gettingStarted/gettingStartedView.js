import { LayoutView } from 'marionette';
import LazyImages from 'behavior/lazyImages';
import template from './gettingStarted.hbs!';

export default LayoutView.extend({
  className: 'gettingStarted content',
  template,

  behaviors: {
    LazyImages: {
      behaviorClass: LazyImages
    }
  }
});