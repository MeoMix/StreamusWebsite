import DialogView from './dialogView';
import TermsOfUseView from './termsOfUseView';

export default DialogView.extend({
  ContentView: TermsOfUseView,
  modelOptions: {
    title: 'Terms of Use'
  }
});