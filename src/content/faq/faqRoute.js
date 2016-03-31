import _ from 'lodash';
import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import FaqView from './faqView.js';
import Faq from './faq.js';

export default Route.extend({
  type: RouteType.Faq,
  viewClass: FaqView,

  // FAQ can either load at the top or focus a specific subject in the view upon instantiation.
  getViewOptions(routeDataParams) {
    const faqOptions = this._getFaqOptions(routeDataParams);

    const viewOptions = {
      model: new Faq(faqOptions)
    };

    return viewOptions;
  },

  _getFaqOptions(routeDataParams) {
    let faqOptions = null;

    if (!_.isUndefined(routeDataParams.initialActiveItemId)) {
      faqOptions = {
        initialActiveItemId: routeDataParams.initialActiveItemId
      };
    }

    return faqOptions;
  }
});