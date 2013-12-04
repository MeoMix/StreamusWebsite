define([
    'text!../template/logo.htm'
], function (LogoTemplate) {
    'use strict';

    var LogoView = Backbone.View.extend({
        
        tagName: 'a',
        
        attributes: {
            'href': 'javascript:void(0)',
            'data-contentid': 'homeContent'
        },

        template: _.template(LogoTemplate),

        urlPrefix: '',
        
        events: {
            'click': 'goToHome'
        },

        render: function () {
            this.$el.html(this.template({
                urlPrefix: this.urlPrefix
            }));
            
            return this;
        },

        initialize: function () {
            //  When requesting images from a sub-domain I need to be explicit with where I am retrieving the resources... I think.
            if (window.location.host === 'share.streamus.com') {
                this.urlPrefix = 'http://www.streamus.com/';
            }

        },
        
        //  If the user has clicked the logo and is viewing the share.streamus sub-domain, go back to the root domain.
        goToHome: function() {
            
            if (this.urlPrefix !== '') {
                document.location.href = 'http://streamus.com';
            }

        }

    });

    return LogoView;
});