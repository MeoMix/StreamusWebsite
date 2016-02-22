import { Region } from 'marionette';
import NotificationView from './notificationView.js';
import Notification from './notification.js';
import Notifications from './notifications.js';

export default Region.extend({
  _notificationQueue: null,

  initialize() {
    this._notificationQueue = new Notifications();
    this.listenTo(App.channels.notification.commands, 'show:notification', this._showNotification);
  },

  onEmpty() {
    // Wait for browser to acknowledge previous view has been removed from the DOM.
    // Without RAF the new notification will instantly appear rather than transition in.
    requestAnimationFrame(() => {
      const queuedNotification = this._notificationQueue.shift();

      if (queuedNotification) {
        this.show(new NotificationView({
          model: queuedNotification
        }));
      }
    });
  },

  _showNotification(notificationOptions) {
    const notification = new Notification(notificationOptions);

    // Ensure each notification is given its full amount of time to display, but
    // also ensure only one notification is visible at a time.
    if (this.hasView()) {
      this._notificationQueue.add(notification);
      this.currentView.hide();
    } else {
      this.show(new NotificationView({
        model: notification
      }));
    }
  }
});