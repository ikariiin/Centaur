const uuid = require('uuid/v1');

export class Subscriber {
  websocket = null;
  id = uuid();
  subscribed = new Set([]);

  constructor(websocket) {
    this.websocket = websocket;
  }

  /**
   * Subscribe to changes.
   * @param {Array} subscriptions
   * This array should contain values from SubscriptionEnum.js
   * @param {Function} callback
   * @param {Object<string,string>} data
   */
  subscribe(subscriptions, callback, data = {}) {
    subscriptions.forEach(subscription => {
      if(this.subscribed.has(subscription)) {
        throw new Error(`Already subscribed to event type ${subscription}`);
      }
    });

    const requestPayload = {
      type: 'subscribe',
      subscriptions,
      id: this.id,
      data
    };

    this.websocket.send(JSON.stringify(requestPayload, null, 2));

    this.subscribed.add(...subscriptions);

    this.websocket.addEventListener('message', event => {
      const data = JSON.parse(event.data);

      if(data.type === 'ack') {
        console.log('%c[sub]', 'font-weight: 700; color: #09599a;', 'Subscription acknowledged by server.');

        // We don't want to pass an ack to the event handler.
        return;
      }

      callback(data);
    });
  }

  unsubscribe(subscriptions, callback) {
    subscriptions.forEach(subscription => {
      this.subscribed.delete(subscription);
    });

    this.websocket.send(JSON.stringify({
      type: 'unsubscribe',
      subscriptions,
      id: this.id
    }, null, 2));
  }
}