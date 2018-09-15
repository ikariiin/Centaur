const SubscriptionEnum = new (require('../SubscriptionsEnum'))();
const ConsoleLogger = require('../../Logger/ConsoleLogger');

class ConversationStarter {
  constructor(id, ws, data) {
    this.id = id;
    this.ws = ws;
    this.data = data;
  }

  getSubscriptionId() {
    return SubscriptionEnum.conversation_start;
  }

  stop() {
    // Clean up stuff here.
    ConsoleLogger.log(`Unsubscribing from ${this.id} for event #${SubscriptionEnum.conversation_start}`);
  }

  start() {
    ConsoleLogger.log(`Subscription from ${this.id} for event #${SubscriptionEnum.conversation_start}`);

    this.ws.send(JSON.stringify({
      id: this.id,
      type: 'ack',
      status: 'Successfully subscribed to Conversation-Starter'
    }, null, 2));

    return this;
  }

  onNewConversation(joinCode, user) {
    this.ws.send(JSON.stringify({
      id: this.id,
      type: 'event',
      status: 'New conversation started',
      data: user,
      joinCode,
    }, null, 2));
  }
}

module.exports = ConversationStarter;