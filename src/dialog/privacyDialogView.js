import DialogView from './dialogView';
import PrivacyView from './privacyView';

export default DialogView.extend({
  ContentView: PrivacyView,
  modelOptions: {
    title: 'Privacy'
  }
});