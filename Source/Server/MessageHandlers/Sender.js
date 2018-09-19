const SubscriptionEnum = new (require('../Publishers/SubscriptionsEnum'))();

class Sender {
  constructor(websocket, message, subs) {
    this.websocket = websocket;
    this.message = message;
    this.subscriptions = subs;
  }

  run() {
    // IDK wtf is going on but i don't want errors in my logs. :/
    if(this === undefined) return;

    Object.values(this.subscriptions).forEach((subscription) => {
      if(typeof subscription === 'undefined' || typeof subscription.conf === 'undefined') return;

      if(subscription.conf.subscriptions.includes(SubscriptionEnum.conversation)) {
        subscription.subscriptionProviders.forEach(provider => {
          if(provider.getSubscriptionId() === SubscriptionEnum.conversation && provider.running) {
            // Uncomment the check if we want to broadcast to the sender as well.
            if(this.message.code === provider.data.myCode /* || this.message.myCode === provider.data.myCode */) {
              provider.send(
                this.message.from,
                this.message.myCode,
                this.message.message,
                this.message.data
              );
            }
          }
        });
      }
    });

    return this;
  }
}

module.exports = Sender;