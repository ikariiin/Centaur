const SubscriptionEnum = new (require('../SubscriptionsEnum'))();
const ConsoleLogger = require('../../Logger/ConsoleLogger');

class ConversationHandler {
  constructor(id, ws, data) {
    this.id = id;
    this.ws = ws;
    this.data = data;
  }

  getSubscriptionId() {
    return SubscriptionEnum.conversation;
  }

  stop() {
    // Clean up stuff here.
    ConsoleLogger.log(`Unsubscribing from ${this.id} for event #${SubscriptionEnum.conversation}`);
  }

  start() {
    // Fist we begin by acknowledging the client that they subscribed to Conversation-Mutation
    ConsoleLogger.log(`Subscription from ${this.id} for event #${SubscriptionEnum.conversation}`);

    this.ws.send(JSON.stringify({
      id: this.id,
      type: 'ack',
      status: 'Successfully subscribed to Conversation-Mutation'
    }, null, 2));

    return this;
  }
}

module.exports = ConversationHandler;