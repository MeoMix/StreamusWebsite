define(function(require) {
    'use function';

    var Route = require('enum/route');

    var InstallButtonView = Marionette.ItemView.extend({
        el: '.installButton',
        template: false,

        events: {
            'click': '_onClick'
        },

        modelEvents: {
            'change:enabled': '_onChangeEnabled',
            'change:text': '_onChangeText'
        },

        webstoreUrl: 'https://chrome.google.com/webstore/detail/jbnkffmindojffecdhbbmekbmkkfpmjd',
        operaExtensionId: 'nnmcpagedcgekmljdamaeahfbmmjloho',

        onRender: function() {
            this._setDisabled(!this.model.get('enabled'));
            this._setText(this.model.get('text'));
        },

        _onClick: function() {
            this._install();
        },

        _onChangeEnabled: function(model, enabled) {
            this._setDisabled(!enabled);
        },

        _onChangeText: function(model, text) {
            this.$el.text(text);
        },

        _setDisabled: function(disabled) {
            this.$el.attr('disabled', disabled);
        },

        _setText: function(text) {
            this.$el.text(text);
        },

        _install: function() {
            if (!this.model.get('disabled')) {
                this.model.set({
                    enabled: false,
                    text: 'Installing...'
                });

                if (this.model.isBrowserOpera()) {
                    opr.addons.installExtension(this.operaExtensionId, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
                } else {
                    chrome.webstore.install(this.webstoreUrl, this._onInstallSuccess.bind(this), this._onInstallError.bind(this));
                }
            }
        },

        _onInstallSuccess: function() {
            this.model.set('text', 'Installed');
            Streamus.router.navigate(Route.GettingStarted, { trigger: true });
        },

        _onInstallError: function(error) {
            if (error === 'User cancelled install') {
                this.model.reset();
            } else {
                this.model.set({
                    text: 'Error: ' + error
                });
            }
        }
    });

    return InstallButtonView;
});