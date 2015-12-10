import { LayoutView } from 'marionette';
import _ from 'lodash';
import template from './social.hbs!';
import './social.css!';

export default LayoutView.extend({
  tagName: 'aside',
  className: 'social',
  template,
  facebookWidgetUrl: '//connect.facebook.net/en_US/all.js#xfbml=1&appId=104501109590252',
  twitterWidgetUrl: '//platform.twitter.com/widgets.js',
  googleWidgetUrl: '//apis.google.com/js/plusone.js',
  githubWidgetUrl: '//api.github.com/repos/meomix/streamuschromeextension?callback=onGitHubApiResponse',

  ui: {
    githubCount: 'githubCount'
  },

  onAttach() {
    // Fade the buttons in over a short period of time to make the loading animations less jarring.
    // Defer to ensure that the browser knows the isLoaded class was not present when the view was attached to the DOM.
    _.defer(this._setIsLoaded.bind(this));
    window.onGitHubApiResponse = this._onGitHubApiResponse.bind(this);

    // Scripts can't be added through a template because Marionette will not run their logic.
    this.$el.append(`<script src="${this.facebookWidgetUrl}"></script>`);
    this.$el.append(`<script src="${this.twitterWidgetUrl}"></script>`);
    this.$el.append(`<script src="${this.googleWidgetUrl}"></script>`);
    this.$el.append(`<script src="${this.githubWidgetUrl}"></script>`);
  },

  _onGitHubApiResponse(response) {
    const stargazerCount = response.data.stargazers_count;
    // Add commas to the returned value. For example, 6237 ==> 6,237
    const formattedCount = String(stargazerCount).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    this.ui.githubCount.html(formattedCount);
  },

  _setIsLoaded() {
    this.$el.addClass('is-loaded');
  }
});