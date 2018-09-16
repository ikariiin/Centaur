const User = require('./User');
const SubscriptionEnum = new (require('../Publishers/SubscriptionsEnum'))();

class UserRegistrar {
  constructor(websocket, message, subscriptions) {
    this.websocket = websocket;
    this.message = message;
    this.subscriptions = subscriptions;
  }

  alertSubscribers() {
    // This is ugly and we obviously wanna fix this ASAP.
    // TODO

    Object.values(this.subscriptions).forEach(subscription => {
      if(typeof subscription === 'undefined') return;

      if(subscription.conf.subscriptions.includes(SubscriptionEnum.user_join)) {
        subscription.subscriptionProviders.forEach(provider => {
          if(provider.getSubscriptionId() === SubscriptionEnum.user_join && provider.running) {
            provider.onUserJoin(this.message.username, this.message.details);
          }
        });
      }
    });
  }

  register() {
    const { username, details }  = this.message;

    this.alertSubscribers();

    const registeredMessagePayload = {
      type: 'registered',
      id: this.message.id,
      status: `Successfully registered user ${username}`
    };

    this.websocket.send(JSON.stringify(registeredMessagePayload, null, 2));

    return new User(username, details, this.subscriptions, this.message);
  }
}

module.exports = UserRegistrar;