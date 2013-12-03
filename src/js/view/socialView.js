define([
    'text!../template/social.htm'
], function (SocialTemplate) {
    'use strict';

    var SocialView = Backbone.View.extend({
        
        tagName: 'aside',
        
        className: 'social',
        
        scriptsLoaded: false,
        
        template: _.template(SocialTemplate),
        
        render: function () {
            this.$el.html(this.template());
            
            if (!this.scriptsLoaded) {
                //  Let the rendered socialView become appended onto the page. 
                this.loadScripts();
            }

            return this;
        },
        
        //  Load the social-media button scripts once 
        loadScripts: function() {

            var facebookButtonScript = $('<script>', {
                async: true,
                id: 'facebook-jssdk',
                src: '//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252'
            });
            this.$el.append(facebookButtonScript);
            
            var twitterButtonScript = $('<script>', {
                async: true,
                id: 'twitter-wjs',
                src: '//platform.twitter.com/widgets.js'
            });
            this.$el.append(twitterButtonScript);
            
            var googlePlusButtonScript =  $('<script>', {
                async: true,
                id: 'google-jspo',
                src: 'https://apis.google.com/js/plusone.js'
            });
            this.$el.append(googlePlusButtonScript);

            this.scriptsLoaded = true;
            
        }

    });

    return SocialView;
});