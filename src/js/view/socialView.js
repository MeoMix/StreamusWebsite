define(function(require) {
    'use strict';

    var SocialTemplate = require('text!template/social.html');

    var SocialView = Marionette.ItemView.extend({
        tagName: 'aside',
        className: 'social',
        template: _.template(SocialTemplate),

        ui: {
            githubStargazerCount: '.github-count'
        },

        onAttach: function() {
            //  Fade the buttons in over a short period of time to make the loading animations less jarring.
            _.defer(this._setIsLoaded.bind(this));

            window.onGitHubApiResponse = this._onGitHubApiResponse.bind(this);

            //  Scripts can't be added through a template because Marionette will not run their logic.
            this.$el.append('<script src="//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252&callbackURL=test"></script>');
            this.$el.append('<script src="//platform.twitter.com/widgets.js"></script>');
            this.$el.append('<script src="//apis.google.com/js/plusone.js"></script>');
            this.$el.append('<script src="//api.github.com/repos/meomix/streamuschromeextension?callback=onGitHubApiResponse"></script>');
        },

        _onGitHubApiResponse: function(response) {
            var stargazerCount = response.data.stargazers_count;
            //  Add commas to the returned value. For example, 6237 ==> 6,237
            var formattedCount = String(stargazerCount).replace(/(\d)(?=(\d{3})+$)/g, "$1,");
            this.ui.githubStargazerCount.html(formattedCount);
        },

        _setIsLoaded: function() {
            this.$el.addClass('is-loaded');
        }
    });

    return SocialView;
});