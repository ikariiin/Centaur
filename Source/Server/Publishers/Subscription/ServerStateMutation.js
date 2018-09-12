const SubscriptionEnum = new (require('../SubscriptionsEnum'))();
const ConsoleLogger = require('../../Logger/ConsoleLogger');

class ServerStateMutation {
  constructor(id, websocket, data) {
    this.websocket = websocket;
    this.id = id;
  }

  getSubscriptionId() {
    return SubscriptionEnum.server_state;
  }

  stop() {
    // Clean up stuff here.
    ConsoleLogger.log(`Unsubscribing from ${this.id} for event #${SubscriptionEnum.server_state}`);
  }

  start() {
    // Fist we begin by acknowledging the client that they subscribed to Server-State-Mutation
    ConsoleLogger.log(`Subscription from ${this.id} for event #${SubscriptionEnum.server_state}`);

    this.websocket.send(JSON.stringify({
      id: this.id,
      type: 'ack',
      status: 'Successfully subscribed to Server-State-Mutation'
    }, null, 2));

    return this;
  }
}

module.exports = ServerStateMutation;