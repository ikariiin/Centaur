const SubscriptionEnum = new (require('../Publishers/SubscriptionsEnum'))();

class Sender {
  constructor(websocket, message, subs) {
    this.websocket = websocket;
    this.message = message;
    this.subscriptions = subs;
  }

  run() {
    Object.values(this.subscriptions).forEach((subscription) => {
      if(typeof subscription === 'undefined') return;

      if(subscription.conf.subscriptions.includes(SubscriptionEnum.conversation)) {
        subscription.subscriptionProviders.forEach(provider => {
          if(provider.getSubscriptionId() === SubscriptionEnum.conversation && provider.running) {
          }
        });
      }
    });
    return this;
  }
}

module.exports = Sender;