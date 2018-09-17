const SubscriptionEnum = new (require('../Publishers/SubscriptionsEnum'))();

class User {
  constructor(username, details, subscriptions, initMessage) {
    this.username = username;
    this.details = details;
    this.subscriptions = subscriptions;
    this.initMessage = initMessage;
  }

  unregister() {
    this.alertUnRegisterSubscribers();
  }

  alertUnRegisterSubscribers() {
    Object.values(this.subscriptions).forEach(subscription => {
      if(typeof subscription === 'undefined' || typeof subscription.conf === 'undefined') return;

      if(subscription.conf.subscriptions.includes(SubscriptionEnum.user_leave)) {
        subscription.subscriptionProviders.forEach(provider => {
          if(provider.getSubscriptionId() === SubscriptionEnum.user_leave && provider.running) {
            provider.onUserLeave(this.initMessage.username, this.initMessage.id, this.initMessage.details);
          }
        });
      }
    });
  }

  getSerializeableObject() {
    return {
      details: this.details,
      username: this.username
    };
  }
}

module.exports = User;