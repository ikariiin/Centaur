const SubscriptionEnum = new (require('../Publishers/SubscriptionsEnum'))();

class PairRequestHandler {
  constructor(websocket, message, users) {
    this.message = message;
    this.users = users;
    this.websocket = websocket;
    this.subscriptions = {};
  }

  check() {
    return Object.keys(this.users).includes(this.message.code);
  }

  sendResponse(response) {
    this.websocket.send(JSON.stringify({
      ...response,
      id: this.message.id
    }, null, 2));
  }

  startConversationForPair() {
    Object.values(this.subscriptions).forEach(subscription => {
      if(typeof subscription === 'undefined') return;

      if(subscription.conf.subscriptions.includes(SubscriptionEnum.conversation_start)) {
        subscription.subscriptionProviders.forEach(provider => {
          if(provider.getSubscriptionId() === SubscriptionEnum.conversation_start && provider.running) {
            provider.onNewConversation(this.message.myJoinCode, this.message.code, this.users[this.message.myJoinCode]);
          }
        });
      }
    });
  }

  run(subscriptions) {
    this.subscriptions = subscriptions;

    if(!this.check()) {
      this.sendResponse({
        type: 'pair-response',
        status: 'No user(s) exist with that join code. Invalid join code.',
        success: false
      });
    }

    this.sendResponse({
      type: 'pair-response',
      status: 'Successfully paired!',
      success: true,
      user: this.users[this.message.code].getSerializeableObject()
    });
    this.startConversationForPair();
  }
}

module.exports = PairRequestHandler;