define([
    'text!template/termsOfUse.htm'
], function (TermsOfUseTemplate) {
    'use strict';

    var TermsOfUseView = Backbone.View.extend({
        
        template: _.template(TermsOfUseTemplate),
        
        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return TermsOfUseView;
});