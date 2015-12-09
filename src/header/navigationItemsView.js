import { CollectionView } from 'marionette';
import NavigationItemView from './navigationItemView';

export default CollectionView.extend({
  tagName: 'ul',
  className: 'navigation nav navbar-nav',
  template: false,
  childView: NavigationItemView
});