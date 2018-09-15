const ConsoleLogger = require('./Logger/ConsoleLogger');
const Subscription = require('./Publishers/Subscription');
const Sender = require('./MessageHandlers/Sender');
const UserRegistrar = require('./Users/UserRegistrar');
const PairRequestHandler = require('./Users/PairRequestHandler');

class Dispatcher {
  constructor() {
    this.dispatchedClientPublishers = {
      subscriptions: {}
    };
    this.onlineUsers = [];
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

  addDeRegisterOnClose(ws, username) {
    ws.addEventListener('close', () => {
      const removedUsers = {};

      for( let id in this.onlineUsers ) {
        if(this.onlineUsers.hasOwnProperty(id) && this.onlineUsers[id].username !== username) {
          removedUsers[id] = this.onlineUsers[id];
        }
      }

      this.onlineUsers = removedUsers;
    });
  }

  handlePairRequest(websocket, message) {
    const pairRequestHandler = new PairRequestHandler(websocket, message, this.onlineUsers);
    pairRequestHandler.run(this.dispatchedClientPublishers.subscriptions);
  }

  start(ws, message) {
    ConsoleLogger.log(`Accepted new event from client ${message.id}.`);
    ConsoleLogger.log(message);

    switch (message.type) {
      case 'subscribe':
        this.dispatchedClientPublishers.subscriptions[message.id] = (new Subscription(ws, message)).run();
        // Also add an unsubscribe handler to this websocket for when it disconnects
        this.addOnCloseUnsubscribe(ws, message);
        break;
      case 'unsubscribe':
        this.dispatchedClientPublishers.subscriptions[message.id].unsubscribe(message);
        break;
      case 'message-send':
        this.dispatchedClientPublishers.subscriptions[message.id] = (new Sender(ws, message, this.dispatchedClientPublishers.subscriptions)).run();
        break;
      case 'register':
        this.onlineUsers[message.id] = (new UserRegistrar(ws, message, this.dispatchedClientPublishers.subscriptions)).register();
        // Remove user if they close their connection
        this.addDeRegisterOnClose(ws, message.username);
        break;
      case 'pair-request':
        this.handlePairRequest(ws, message);
        break;
      default:
        throw new Error("Message received from client which doesn't conform to the defined types.");
    }
  }
}

module.exports = Dispatcher;