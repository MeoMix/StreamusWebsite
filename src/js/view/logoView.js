define([
    'text!template/logo.htm'
], function (LogoTemplate) {
    'use strict';

    var LogoView = Backbone.View.extend({
        
        tagName: 'a',
        
        className: 'logo',
        
        attributes: {
            'data-route': 'home'
        },

        template: _.template(LogoTemplate),
        
        //  When requesting images from a sub-domain I need to be explicit with where I am retrieving the resources... I think.
        urlPrefix: window.location.host === 'share.streamus.com' ? 'http://www.streamus.com/' : '',
        
        events: {
            'click': 'navigateHome'
        },

        render: function () {
            //  TODO: Not confident urlPrefix is necessary. Need to test.
            this.$el.html(this.template({
                urlPrefix: this.urlPrefix
            }));
            
            return this;
        },
        
        //  If the user has clicked the logo and is viewing the share.streamus sub-domain, go back to the root domain.
        //  Otherwise just route as normal.
        navigateHome: function () {
            
            if (this.urlPrefix !== '') {
                document.location.href = 'http://streamus.com';
            }

        }

    });

    return LogoView;
});