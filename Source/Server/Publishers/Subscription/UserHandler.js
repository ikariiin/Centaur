const SubscriptionEnum = new (require('../SubscriptionsEnum'))();
const ConsoleLogger = require('../../Logger/ConsoleLogger');

class UserHandler {
  constructor(type, id, websocket, data) {
    this.type = type;
    this.id = id;
    this.websocket = websocket;
  }

  getSubscriptionId() {
    switch (this.type) {
      case 'change':
        return SubscriptionEnum.user_change;
      case 'leave':
        return SubscriptionEnum.user_leave;
      case 'join':
        return SubscriptionEnum.user_join;
    }
  }

  stop() {
    // Clean up things
    ConsoleLogger.log(`Unsubscribing from ${this.id} for event #${this.getSubscriptionId()}`);
  }

  start() {
    // Fist we begin by acknowledging the client that they subscribed to User-Mutations
    ConsoleLogger.log(`Subscription from ${this.id} for event #${this.getSubscriptionId()}`);


    this.websocket.send(JSON.stringify({
      id: this.id,
      type: 'ack',
      status: 'Successfully subscribed to User-Mutations'
    }, null, 2));

    return this;
  }
}

module.exports = UserHandler;