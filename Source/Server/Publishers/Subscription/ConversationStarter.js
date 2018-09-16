const SubscriptionEnum = new (require('../SubscriptionsEnum'))();
const ConsoleLogger = require('../../Logger/ConsoleLogger');

class ConversationStarter {
  constructor(id, ws, data) {
    this.id = id;
    this.ws = ws;
    this.data = data;
    this.running = false;
  }

  getSubscriptionId() {
    return SubscriptionEnum.conversation_start;
  }

  stop() {
    // Clean up stuff here.
    ConsoleLogger.log(`Unsubscribing from ${this.id} for event #${SubscriptionEnum.conversation_start}`);

    this.running = true;
  }

  start() {
    ConsoleLogger.log(`Subscription from ${this.id} for event #${SubscriptionEnum.conversation_start}`);

    this.ws.send(JSON.stringify({
      id: this.id,
      type: 'ack',
      status: 'Successfully subscribed to Conversation-Starter'
    }, null, 2));

    this.running = true;

    return this;
  }

  onNewConversation(joinCode, code, user) {
    this.ws.send(JSON.stringify({
      id: this.id,
      type: 'event',
      status: 'New conversation started',
      data: user.getSerializeableObject(),
      joinCode,
      pairWith: code
    }, null, 2));
  }
}

module.exports = ConversationStarter;