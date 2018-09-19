const uuid = require('uuid/v1');

export class Sender {
  /**
   * @type {WebSocket}
   */
  websocket = null;

  /**
   * @type {String}
   */
  id = uuid();

  constructor(websocket) {
    this.websocket = websocket;
  }

  sendMessage(senderUsername, messageContent, receiverUsername, receiverCode, myCode, data) {
    const payload = {
      type: 'message-send',
      from: senderUsername,
      message: messageContent,
      to: receiverUsername,
      id: this.id,
      code: receiverCode,
      myCode,
      data
    };

    this.websocket.send(JSON.stringify(payload, null, 2));
  }
}