import { Model } from 'backbone';
import FaqType from './faqType';

export default Model.extend({
  id: null,
  title: '',
  description: '',
  type: FaqType.None,
  isActive: false
});