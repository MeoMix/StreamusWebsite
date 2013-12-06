define([
    'text!template/privacy.html'
], function (PrivacyTemplate) {
    'use strict';

    var PrivacyView = Backbone.View.extend({
        
        template: _.template(PrivacyTemplate),
        
        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return PrivacyView;
});