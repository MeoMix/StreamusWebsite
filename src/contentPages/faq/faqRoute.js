import _ from 'lodash';
import Route from 'route/route';
import RouteType from 'route/routeType';
import FaqView from './faqView';
import Faq from './faq';

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