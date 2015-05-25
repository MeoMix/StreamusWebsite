define(function(require) {
  'use strict';

  var DialogView = require('view/dialog/dialogView');
  var TermsOfUseView = require('view/dialog/termsOfUseView');

  var TermsOfUseDialogView = DialogView.extend({
    contentViewClass: TermsOfUseView,
    modelOptions: {
      title: 'Terms of Use'
    }
  });

  return TermsOfUseDialogView;
});