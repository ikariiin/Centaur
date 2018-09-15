const uuid = require('uuid/v1');

export class Registrar {
  constructor(websocket, username, details = {}) {
    this.websocket = websocket;
    this.username = username;
    this.details = details;
    this.id = uuid();
  }

  handleRegisterConfirmation(data, callback) {
    const sentData = JSON.parse(data.data);
    if(sentData.id === this.id) {
      callback();
    }
  }

  register(callback) {
    const payload = {
      type: 'register',
      id: this.id,
      username: this.username,
      details: this.details
    };

    this.websocket.send(JSON.stringify(payload, null, 2));

    this.websocket.addEventListener('message', (data) => this.handleRegisterConfirmation(data, callback));
  }
}