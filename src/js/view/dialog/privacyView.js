define(function(require) {
  'use strict';

  var PrivacyTemplate = require('text!template/dialog/privacy.html');

  var PrivacyView = Marionette.ItemView.extend({
    template: _.template(PrivacyTemplate)
  });

  return PrivacyView;
});