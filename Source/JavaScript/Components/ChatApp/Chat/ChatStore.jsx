import React from 'react';

export default class ChatStore extends React.Component {
  store = {
    people: {},
    conversations: {}
  };

  addPerson(code, person) {
    this.store.people[code] = person;

    console.log(this.store)
  }

  putConversation(code, conversation) {
    this.store.conversations[code] = conversation;
    console.log(this.store)
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, {
          chatStore: this.store,
          addPerson: (person) => this.addPerson(person),
          putConversation: (code, conversation) => this.putConversation(code, conversation)
        })}
        { console.log(this.store) }
      </React.Fragment>
    );
  }
}