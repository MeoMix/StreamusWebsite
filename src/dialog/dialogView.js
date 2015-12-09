import { LayoutView } from 'marionette';
import Dialog from './dialog';
import template from './dialog.hbs!';

export default LayoutView.extend({
  className: 'modal fade',
  template,

  events: {
    'hidden.bs.modal': '_onHidden'
  },

  regions: {
    content: 'content'
  },

  ContentView: null,
  modelOptions: null,

  initialize() {
    this.model = new Dialog(this.modelOptions);
  },

  onRender() {
    const contentView = new this.ContentView();
    this.showChildView('content', contentView);

    this.$el.modal();
  },

  _onHidden() {
    this.remove();
  }
});