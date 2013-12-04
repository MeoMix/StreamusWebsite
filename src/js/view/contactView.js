define([
    'text!../../template/contact.htm'
], function (ContactTemplate) {
    'use strict';

    var ContactView = Backbone.View.extend({
        
        template: _.template(ContactTemplate),
        
        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return ContactView;
});