import browser from 'jquery.browser';
import { Model } from 'backbone';

export default Model.extend({
  defaults: {
    isMobile: browser.mobile || false,
    isOpera: browser.opr || false,
    isChrome: browser.chrome || false,
    isWebKit: browser.chrome || browser.opr || false,
    version: browser.version
  }
});