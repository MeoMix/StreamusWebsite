import Route from 'route/route.js';
import RouteType from 'route/routeType.js';
import ShareView from './shareView.js';
import ShareCode from './shareCode.js';
import Share from './share.js';

export default Route.extend({
  type: RouteType.Share,
  viewClass: ShareView,

  // The ShareView can be built by itself or with a information for showing a shareable entity.
  getViewOptions(routeDataParams) {
    const shareOptions = this._getShareOptions(routeDataParams);

    const viewOptions = {
      model: new Share(shareOptions)
    };

    return viewOptions;
  },

  _getShareOptions(routeDataParams) {
    let shareOptions = null;

    if (routeDataParams.entityType) {
      shareOptions = {
        shareCode: this._getShareCode(routeDataParams)
      };
    }

    return shareOptions;
  },

  _getShareCode(routeDataParams) {
    const shareCode = new ShareCode({
      entityType: routeDataParams.entityType,
      shortId: routeDataParams.shortId,
      urlFriendlyEntityTitle: routeDataParams.urlFriendlyEntityTitle
    });

    return shareCode;
  }
});