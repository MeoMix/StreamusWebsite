import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    simpleMenuItems: null,
    listItemHeight: 0,
    isContextMenu: false,
    offsetTop: 0,
    offsetLeft: 0
  }
});