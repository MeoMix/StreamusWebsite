define(function(require) {
    'use function';

    var Button = require('view/behavior/button');

    var InstallButtonView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'installButton btn btn-lg btn-success',
        template: false,

        behaviors: {
            Button: {
                behaviorClass: Button
            }
        },

        initialize: function() {
            this.listenTo(Streamus.extensionData, 'change:installed', this._onExtensionDataChangeInstalled);
        },

        onClick: function() {
            this.model.install();
        },

        _onExtensionDataChangeInstalled: function(model, installed) {
            this.model.setInstalledState(installed);
        }
    });

    return InstallButtonView;
});