import { Model } from 'backbone';

export default Model.extend({
  url: 'http://localhost:39853/Email/',

  defaults: {
    name: '',
    // Reasonable name limit: http://stackoverflow.com/a/30509/633438
    nameMaxLength: 70,
    email: '',
    // Maximum email length: http://stackoverflow.com/a/574698/633438
    emailMaxLength: 254,
    message: '',
    messageMaxLength: 2000
  },

  validate() {
    const validationErrors = [];

    const name = this.get('name');
    if (name.length === 0 || name.length > this.get('nameMaxLength')) {
      validationErrors.push('Name is invalid');
    }

    const email = this.get('email');
    if (email.length === 0 || email.length > this.get('emailMaxLength')) {
      validationErrors.push('Email is invalid');
    }

    const message = this.get('message');
    if (message.length === 0 || message.length > this.get('messageMaxLength')) {
      validationErrors.push('Message is invalid');
    }

    return validationErrors.length > 0 ? validationErrors.join(' ') : null;
  }
});