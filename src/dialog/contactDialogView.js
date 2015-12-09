import DialogView from './dialogView';
import ContactView from './contactView';

export default DialogView.extend({
  ContentView: ContactView,
  modelOptions: {
    title: 'Contact'
  }
});