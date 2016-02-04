import _ from 'lodash';

_.mixin({
  // Inspired by: https://gist.github.com/danro/7846358
  // Leverage requestAnimationFrame for throttling function calls instead of setTimeout for better perf.
  throttleFramerate(callback) {
    let isWaiting = false;

    return () => {
      if (!isWaiting) {
        isWaiting = true;

        requestAnimationFrame(() => {
          isWaiting = false;
          callback(...arguments);
        });
      }
    };
  }
});