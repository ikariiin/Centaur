import React, { Component } from 'react';
import Message from "./Message";

export default class MessageGroup extends Component {
  render() {
    return (
      <section className={`message-group ${this.props.activeUsername === this.props.conversation.sender ? 'mine' : ''} ${this.props.conversation.messages.length === 0 ? 'single-message' : ''}`}>
        {this.props.conversation.messages.map((message, index) => (
          <Message index={index} sender={this.props.conversation.sender} message={message} key={index} />
        ))}
      </section>
    );
  }
}