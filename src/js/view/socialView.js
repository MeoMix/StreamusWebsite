define([
    'text!../../template/social.htm'
], function (SocialTemplate) {
    'use strict';

    var SocialView = Backbone.View.extend({
        
        tagName: 'aside',
        
        className: 'social',
        
        scriptsLoaded: false,
        
        template: _.template(SocialTemplate),
        
        render: function () {
            this.$el.html(this.template());
            return this;
        }

    });

    return SocialView;
});