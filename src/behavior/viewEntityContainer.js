import { Behavior } from 'marionette';
// Polyfill is needed for Reflect API
import 'babel-polyfill';

// Provides event handler unbinding of models or collections given to the implementing view.
// If a view's entity has bound event listeners and the view is destroyed then those event listeners
// become a memory leak if no references to the entity remain.
// If an entity's lifetime is scoped to its view then it can safely bind event listeners
// if the view implements this Behavior.
// Example:
// ViewEntityContainer: {
//   behaviorClass: ViewEntityContainer,
//   viewEntityNames: ['model']
// }
export default Behavior.extend({
  defaults: {
    viewEntityNames: []
  },

  initialize() {
    if (this.options.viewEntityNames.length === 0) {
      throw new Error('ViewEntityContainer expects viewEntityNames to be provided');
    }
  },

  onRender() {
    this._ensureViewEntities();
  },

  onBeforeDestroy() {
    this._cleanupViewEntities();
  },

  // Ensure that the models declared as targets are valid by confirm that they exist
  // and are not attached to other views. If a model is attached to two views and one
  // view is destroyed while the other remains then the second view won't work properly
  // because its model won't have any event handlers configured.
  _ensureViewEntities() {
    for (const viewEntityName of this.options.viewEntityNames) {
      this._ensureViewReferencesViewEntity(viewEntityName);
      this._ensureViewEntityUnattached(viewEntityName);
      this._markViewEntityAttached(viewEntityName);
    }
  },

  // Make sure the model is a property of the view.
  _ensureViewReferencesViewEntity(viewEntityName) {
    if (!this.view.hasOwnProperty(viewEntityName)) {
      throw new Error(`ViewEntityContainer expects viewEntity ${viewEntityName} to be a property of the view`);
    }
  },

  // Make sure the model is not already attached to another view.
  _ensureViewEntityUnattached(viewEntityName) {
    if (this.view[viewEntityName]._isAttachedToView) {
      throw new Error(`ViewEntity ${viewEntityName} is already attached to a view.`);
    }
  },

  _markViewEntityAttached(viewEntityName) {
    this.view[viewEntityName]._isAttachedToView = true;
  },

  // Force each model to unbind its event listeners and mark itself unattached.
  _cleanupViewEntities() {
    for (const viewEntityName of this.options.viewEntityNames) {
      // Make sure the view didn't trash its reference to the model during its lifetime.
      this._ensureViewReferencesViewEntity(viewEntityName);
      const viewEntity = this.view[viewEntityName];
      viewEntity.stopListening();
      delete viewEntity._isAttachedToView;
    }
  }
});