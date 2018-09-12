const ConsoleLogger = require('./Logger/ConsoleLogger');
const Subscription = require('./Publishers/Subscription');

class Dispatcher {
  constructor() {
    this.dispatchedClientPublishers = {
      subscriptions: {}
    };
  }

  addOnCloseUnsubscribe(ws, message) {
    ws.addEventListener('close', () => {
      // Here we fake an incoming unsubscribe message

      this.dispatchedClientPublishers.subscriptions[message.id].unsubscribe({
        ...message,
        type: 'unsubscribe'
      });
    })
  }

  start(websocket, message) {
    ConsoleLogger.log(`Accepted new event from client ${message.id}.`);

    switch (message.type) {
      case 'subscribe':
        this.dispatchedClientPublishers.subscriptions[message.id] = (new Subscription(websocket, message)).run();

        // Also add an unsubscribe handler to this websocket for when it disconnects
        this.addOnCloseUnsubscribe(websocket, message);
        break;
      case 'unsubscribe':
        this.dispatchedClientPublishers.subscriptions[message.id].unsubscribe(message);
        break;
      default:
        throw new Error("Message received from client which doesn't conform to the defined types.");
    }
  }
}

module.exports = Dispatcher;