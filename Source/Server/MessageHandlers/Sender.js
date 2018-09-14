const SubscriptionEnum = new (require('../Publishers/SubscriptionsEnum'))();

class Sender {
  constructor(websocket, message, subs) {
    this.websocket = websocket;
    this.message = message;
    this.subStore = subs;
  }

  run() {
    Object.entries(this.subStore).map(sub => sub[1]).forEach((sub) => {
      /** @type Subscriber sub */
      if(!sub.running) return;

      if(sub.conf.subscriptions.includes(SubscriptionEnum.conversation) && sub.conf.data.username === this.message.to) {
        console.log(`Message to ${sub.conf.data.username}: ${this.message.message}`);
      }
    });
    return this;
  }
}

module.exports = Sender;