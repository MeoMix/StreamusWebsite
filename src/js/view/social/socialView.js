define(function(require) {
  'use strict';

  var SocialTemplate = require('text!template/social/social.html');

  var SocialView = Marionette.ItemView.extend({
    tagName: 'aside',
    className: 'social',
    template: _.template(SocialTemplate),
    facebookWidgetUrl: '//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252',
    twitterWidgetUrl: '//platform.twitter.com/widgets.js',
    googleWidgetUrl: '//apis.google.com/js/plusone.js',
    githubWidgetUrl: '//api.github.com/repos/meomix/streamuschromeextension?callback=onGitHubApiResponse',

    ui: {
      githubStargazerCount: '.github-count'
    },

    onAttach: function() {
      // Fade the buttons in over a short period of time to make the loading animations less jarring.
      // Defer to ensure that the browser knows the isLoaded class was not present when the view was attached to the DOM.
      _.defer(this._setIsLoaded.bind(this));
      window.onGitHubApiResponse = this._onGitHubApiResponse.bind(this);

      // Scripts can't be added through a template because Marionette will not run their logic.
      this.$el.append('<script src="' + this.facebookWidgetUrl + '"></script>');
      this.$el.append('<script src="' + this.twitterWidgetUrl + '"></script>');
      this.$el.append('<script src="' + this.googleWidgetUrl + '"></script>');
      this.$el.append('<script src="' + this.githubWidgetUrl + '"></script>');
    },

    _onGitHubApiResponse: function(response) {
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      var stargazerCount = response.data.stargazers_count;
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
      // Add commas to the returned value. For example, 6237 ==> 6,237
      var formattedCount = String(stargazerCount).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      this.ui.githubStargazerCount.html(formattedCount);
    },

    _setIsLoaded: function() {
      this.$el.addClass('is-loaded');
    }
  });

  return SocialView;
});