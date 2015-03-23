define(function(require) {
    'use strict';

    var FaqTemplate = require('text!template/content/faq.html');
    var Updatable = require('view/behavior/updatable');
    var RouteType = require('enum/routeType');

    var FaqView = Marionette.LayoutView.extend({
        className: 'faq content',
        template: _.template(FaqTemplate),

        ui: {
            panelHeadings: '.panel-heading'
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

        onRender: function() {
            //  Activate a topic if linked to it and expand it by setting Bootstrap's classes.
            var activeSubjectId = this.model.get('activeSubjectId');
            this._activateSubject(activeSubjectId);
        },
        
        _onClickPanelHeading: function(event) {
            //  Ensure the URL stays sync'ed with the active item.
            var panelHeading = $(event.currentTarget);
            //  Inverse this because Bootstrap's controlling the 'collapsed' property and it runs after Marionette's onClick.
            var isCollapsed = !panelHeading.hasClass('collapsed');
            var target = panelHeading.data('target');

            this._syncRoute(isCollapsed, target);
        },

        _onChangeActiveSubjectId: function() {
            this.render();
        },
        
        _syncRoute: function(panelIsCollapsed, panelTarget) {
            var route = RouteType.Faq;
            var activeSubjectId = '';

            if (!panelIsCollapsed) {
                activeSubjectId = panelTarget.replace('#', '');
                route += '/' + activeSubjectId;
            }

            Streamus.router.navigate(route);
            //  If I want to make this not silent I'll need to remove my dependency on Bootstrap's animations because
            //  re-rendering the view conflicts with element transitions.
            this.model.set('activeSubjectId', activeSubjectId, {
                silent: true
            });
        },

        _activateSubject: function(subjectId) {
            var panelHeading = this._getPanelHeading(subjectId);

            if (panelHeading.length > 0) {
                panelHeading.removeClass('collapsed');

                var panelContent = this._getPanelContent(subjectId);
                panelContent.addClass('in');

                //  Ensure that the content is visible. Defer to allow it to expand first.
                _.defer(function() {
                    panelContent[0].scrollIntoView(false);
                });
            }
        },

        _getPanelHeading: function(subjectId) {
            var panelHeading = this.ui.panelHeadings.filter('[data-target="#' + subjectId + '"]');
            return panelHeading;
        },
        
        _getPanelContent: function(subjectId) {
            var panelContent = this.$el.find('#' + subjectId);
            return panelContent;
        }
    });

    return FaqView;
});