define(function() {
    'use strict';

    var Faq = Backbone.Model.extend({
        defaults: {
            activeSubjectId: ''
        }
    });

    return Faq;
});