import { LayoutView } from 'marionette';
import _ from 'lodash';
import $ from 'jquery';
import template from './faq.hbs!';
import './faq.css!';
import Updatable from 'behavior/updatable';
import RouteType from 'common/enum/routeType';

export default LayoutView.extend({
  className: 'faq content',
  template,

  ui: {
    panelHeadings: 'panelHeading'
  },

  events: {
    'click @ui.panelHeadings': '_onClickPanelHeading'
  },

  modelEvents: {
    'change:activeSubjectId': '_onChangeActiveSubjectId'
  },

  behaviors: {
    Updatable: {
      behaviorClass: Updatable
    }
  },

  onRender() {
    // Activate a topic if linked to it and expand it by setting Bootstrap's classes.
    const activeSubjectId = this.model.get('activeSubjectId');
    this._activateSubject(activeSubjectId);
  },

  _onClickPanelHeading(event) {
    // Ensure the URL stays sync'ed with the active item.
    const panelHeading = $(event.currentTarget);
    // Inverse this because Bootstrap's controlling the 'collapsed' property and it runs after Marionette's onClick.
    const isCollapsed = !panelHeading.hasClass('collapsed');
    const target = panelHeading.data('target');

    this._syncRoute(isCollapsed, target);
  },

  _onChangeActiveSubjectId() {
    this.render();
  },

  _syncRoute(panelIsCollapsed, panelTarget) {
    let route = RouteType.Faq;
    let activeSubjectId = '';

    if (!panelIsCollapsed) {
      activeSubjectId = panelTarget.replace('#', '');
      route += `/${activeSubjectId}`;
    }

    App.router.navigate(route);
    // If I want to make this not silent I'll need to remove my dependency on Bootstrap's animations because
    // re-rendering the view conflicts with element transitions.
    this.model.set('activeSubjectId', activeSubjectId, {
      silent: true
    });
  },

  _activateSubject(subjectId) {
    const panelHeading = this._getPanelHeading(subjectId);

    if (panelHeading.length > 0) {
      panelHeading.removeClass('collapsed');

      const panelContent = this._getPanelContent(subjectId);
      panelContent.addClass('in');

      // Ensure that the content is visible. Defer to allow it to expand first.
      _.defer(() => {
        panelContent[0].scrollIntoView(false);
      });
    }
  },

  _getPanelHeading(subjectId) {
    const panelHeading = this.ui.panelHeadings.filter(`[data-target="#${subjectId}"]`);
    return panelHeading;
  },

  _getPanelContent(subjectId) {
    const panelContent = this.$el.find(`#${subjectId}`);
    return panelContent;
  }
});