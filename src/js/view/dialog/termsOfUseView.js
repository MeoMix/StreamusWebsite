define(function(require) {
  'use strict';

  var TermsOfUseTemplate = require('text!template/dialog/termsOfUse.html');

  var TermsOfUseView = Marionette.ItemView.extend({
    template: _.template(TermsOfUseTemplate)
  });

  return TermsOfUseView;
});