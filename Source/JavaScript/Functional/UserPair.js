const uuid = require('uuid/v1');

export class UserPair {
  constructor(websocket) {
    this.websocket = websocket;
    this.id = uuid();
  }

  handlePairResponse(event, callback) {
    const parsedData = JSON.parse(event.data);

    if(parsedData.type === 'pair-response' && parsedData.id === this.id) {
      if(parsedData.success) {
        callback(parsedData.user);
      } else {
        // Problem finding the user?
        throw new Error(parsedData.status);
      }
    }
  }

  request(joinCode, myUsername, myJoinCode, callback) {
    const payload = {
      code: joinCode,
      id: this.id,
      type: 'pair-request',
      myUsername,
      myJoinCode
    };

    this.websocket.send(JSON.stringify(payload, null, 2));

    this.websocket.addEventListener('message', (event) => this.handlePairResponse(event, callback));

    return this;
  }
}