import React from 'react';

export default class ChatStore extends React.Component {
  store = {
    people: [],
    conversation: {},
    activeChatContext: {
      username: null,
      code: null,
      details: null,
      active: true
    }
  };

  storeAddPerson(person) {
    this.store.people.push(person);
  }

  storeSetActiveChatContext(context) {
    this.store.activeChatContext = context;
  }

  storeAppendConversation(code, message) {
    // Check if there is already a conversation array present
    // or at least if it is defined.
    if(this.store.conversation[code] === undefined) {
      // Then create an empty array in its place
      this.store.conversation[code] = [];
    }

    this.store.conversation[code].push(message);
  }

  storeGetConversation(code) {
    // Same routine. If it is not defined, send an empty array.
    return (this.store.conversation[code] === undefined) ? [] : this.store.conversation[code];
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, {
          chatStore: this.store,
          storeAddPerson: (person) => this.storeAddPerson(person),
          storeAppendConversation: (code, message) => this.storeAppendConversation(code, message),
          storeSetActiveChatContext: (context) => this.storeSetActiveChatContext(context),
          storeGetConversation: (code) => this.storeGetConversation(code)
        })}
      </React.Fragment>
    );
  }
}