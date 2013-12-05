define([
    'text!template/footer.htm'
], function (FooterTemplate) {
    'use strict';

    var FooterView = Backbone.View.extend({

        className: 'footer row',

        template: _.template(FooterTemplate),
        
        urlPrefix: '',

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

        }

    });

    return FooterView;
});