import { LayoutView } from 'marionette';
import template from './playlistItem.hbs!';

export default LayoutView.extend({
  tagName: 'li',
  className: 'playlistItem list-group-item',
  template
});