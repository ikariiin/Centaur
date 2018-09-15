// const ConsoleLogger = require("../Logger/ConsoleLogger");
const ServerStateMutation = require("./Subscription/ServerStateMutation");
const SubscriptionEnum = new (require('./SubscriptionsEnum'))();
const UserHandler = require('./Subscription/UserHandler');
const ConversationHandler = require('./Subscription/ConversationHandler');
const ConversationStarter = require('./Subscription/ConversationStarter');

class Subscription {
  constructor(websocket, initMessage) {
    this.websocket = websocket;
    this.conf = initMessage;
    this.messageData = initMessage.data;
    this.subscriptionProviders = [];
    this.running = false;
  }

  run() {
    const subscriptions = this.conf['subscriptions'];
    if(!subscriptions) {
      throw new Error("Subscription from doesn't contain a field 'subscription'.");
    }

    subscriptions.forEach(subscription => {
      switch (subscription) {
        case SubscriptionEnum.server_state:
          this.subscriptionProviders.push(
            (new ServerStateMutation(this.conf.id, this.websocket, this.messageData)).start()
          );
          break;
        case SubscriptionEnum.user_join:
          this.subscriptionProviders.push(
            (new UserHandler('join', this.conf.id, this.websocket, this.messageData)).start()
          );
          break;
        case SubscriptionEnum.user_leave:
          this.subscriptionProviders.push(
            (new UserHandler('leave', this.conf.id, this.websocket, this.messageData)).start()
          );
          break;
        case SubscriptionEnum.user_change:
          this.subscriptionProviders.push(
            (new UserHandler('change', this.conf.id, this.websocket, this.messageData)).start()
          );
          break;
        case SubscriptionEnum.conversation:
          this.subscriptionProviders.push(
            (new ConversationHandler(this.conf.id, this.websocket, this.messageData)).start()
          );
          break;
        case SubscriptionEnum.conversation_start:
          this.subscriptionProviders.push(
            (new ConversationStarter(this.conf.id, this.websocket, this.messageData)).start()
          );
          break;
      }
    });

    this.running = true;

    return this;
  }

  unsubscribe(message) {
    const unsubIds = message['subscriptions'];
    this.subscriptionProviders = this.subscriptionProviders.filter(provider => {
      if(provider.id === message.id) {
        // Then we shall even start thinking about comparing the subs
        const provideSubId = provider.getSubscriptionId();
        if(unsubIds.includes(provideSubId)) {
          // Stop the provider
          provider.stop();

          // Remove this provider
          return false;
        }
      }

      return true;
    });

    this.running = false;
  }
}

module.exports = Subscription;