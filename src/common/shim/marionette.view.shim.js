/* eslint max-len: 0 */
// All views should look up ui elements with a "data-ui~=name" attribute.
// Make the lookup of ui elements by their data-ui attribute implicit.
// Optionally allow the user to opt-out of this functionaliy via 'useCustomUiSelector' flag.
import _ from 'lodash';
import Marionette from 'marionette';

// Provide a flag to opt-out if so desired.
Marionette.View.prototype.useCustomUiSelector = false;

Marionette.View.prototype._buildRegionFromObject = function(definition) {
  var RegionClass = definition.regionClass || this.getOption('regionClass');

  var options = _.omit(definition, 'regionClass');

  _.defaults(options, {
    el: definition.selector,
    parentEl: _.partial(_.result, this, 'el')
  });

  if (!this.useCustomUiSelector) {
    options.el = `[data-region=${options.el}]`;
  }

  return new RegionClass(options);
};

// This method binds the elements specified in the "ui" hash inside the view's code with
// the associated jQuery selectors
Marionette.View.prototype._bindUIElements = Marionette.Behavior.prototype._bindUIElements = function() {
  if (!this.ui) { return; }

  // store the ui hash in _uiBindings so they can be reset later
  // and so re-rendering the view will be able to find the bindings
  if (!this._uiBindings) {
    this._uiBindings = this.ui;
  }

  // get the bindings result, as a function or otherwise
  const bindings = _.result(this, '_uiBindings');

  // empty the ui so we don't have anything to start with
  this._ui = {};

  // bind each of the selectors
  _.each(bindings, (selector, key) => {
    // Since _bindUIElements can be called by a behavior -- need to check for existence of this.view
    const customSelector = this.useCustomUiSelector || this.view && this.view.useCustomUiSelector ? selector : `[data-ui~=${selector}]`;
    this._ui[key] = this.$(customSelector);
  });

  this.ui = this._ui;
};

/* UI MIXIN */
// allows for the use of the @ui. syntax within
// a given key for triggers and events
// swaps the @ui with the associated selector.
// Returns a new, non-mutated, parsed events hash.
var normalizeUIKeys = function(hash, ui, useCustomUiSelector) {
  return _.reduce(hash, function(memo, val, key) {
    var normalizedKey = normalizeUIString(key, ui, useCustomUiSelector);
    memo[normalizedKey] = val;
    return memo;
  }, {});
};

// utility method for parsing @ui. syntax strings
// into associated selector
var normalizeUIString = function(uiString, ui, useCustomUiSelector) {
  return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function(r) {
    let normalizedUIString;

    if (useCustomUiSelector) {
      normalizedUIString = ui[r.slice(4)];
    } else {
      normalizedUIString = `[data-ui~=${ui[r.slice(4)]}]`;
    }

    return normalizedUIString;
  });
};

// allows for the use of the @ui. syntax within
// a given value for regions
// swaps the @ui with the associated selector
var normalizeUIValues = function(hash, ui, properties, useCustomUiSelector) {
  _.each(hash, function(val, key) {
    if (_.isString(val)) {
      hash[key] = normalizeUIString(val, ui, useCustomUiSelector);
    } else if (_.isObject(val) && _.isArray(properties)) {
      _.extend(val, normalizeUIValues(_.pick(val, properties), ui, useCustomUiSelector));
      /* Value is an object, and we got an array of embedded property names to normalize. */
      _.each(properties, function(property) {
        var propertyVal = val[property];
        if (_.isString(propertyVal)) {
          val[property] = normalizeUIString(propertyVal, ui, useCustomUiSelector);
        }
      });
    }
  });
  return hash;
};
/* UI MIXIN */

// normalize the keys of passed hash with the views `ui` selectors.
// `{"@ui.foo": "bar"}`
Marionette.View.prototype.normalizeUIKeys = Marionette.Behavior.prototype.normalizeUIKeys =  function(hash) {
  var uiBindings = this._getUIBindings();
  return normalizeUIKeys(hash, uiBindings, this.useCustomUiSelector || this.view && this.view.useCustomUiSelector);
};

// normalize the values of passed hash with the views `ui` selectors.
// `{foo: "@ui.bar"}`
Marionette.View.prototype.normalizeUIValues = Marionette.Behavior.prototype.normalizeUIValues = function(hash, properties) {
  var uiBindings = this._getUIBindings();
  return normalizeUIValues(hash, uiBindings, properties, uiBindings, this.useCustomUiSelector || this.view && this.view.useCustomUiSelector);
};