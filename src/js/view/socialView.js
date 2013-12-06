define([
    'text!template/social.htm'
], function (SocialTemplate) {
    'use strict';

    var SocialView = Backbone.View.extend({
        
        tagName: 'aside',
        
        className: 'social loading',
        
        scriptsLoaded: false,
        
        template: _.template(SocialTemplate),
        
        render: function () {
            this.$el.html(this.template());
            this.appendScripts();
            return this;
        },
        
        appendScripts: function () {
            //  TODO: How can I detect these scripts loading so I know when to actually fade it in?
            var facebookButtonScript = $('<script>', {
                async: true,
                defer: true,
                id: 'facebook-jssdk',
                src: '//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252'
            });
            this.$el.append(facebookButtonScript);

            var twitterButtonScript = $('<script>', {
                async: true,
                defer: true,
                id: 'twitter-wjs',
                src: '//platform.twitter.com/widgets.js'
            });
            this.$el.append(twitterButtonScript);

            var googlePlusButtonScript = $('<script>', {
                async: true,
                defer: true,
                id: 'google-jspo',
                src: 'https://apis.google.com/js/plusone.js'
            });
            this.$el.append(googlePlusButtonScript);

            //  TODO: Is there a better way to detect these scripts having loaded?
            setTimeout(function () {
                this.$el.removeClass('loading');

                //  Wrap in a set timeout to let the css3 transition start before removing it's effect.
                setTimeout(function () {
                    //  Change the transition to 0 so on-hover can fade-in to 1.0 instantly and back.
                    this.$el.css('transition', 'opacity 0s');
                }.bind(this));
            }.bind(this), 3000);
        }

    });

    return SocialView;
});