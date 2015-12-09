import _ from 'lodash';
import Route from 'common/route';
import RouteType from 'common/enum/routeType';
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

    if (!_.isUndefined(routeDataParams.activeSubjectId)) {
      faqOptions = {
        activeSubjectId: routeDataParams.activeSubjectId
      };
    }

    return faqOptions;
  }
});