import React, { Component } from 'react';
import UserAvatar from "./UserAvatar";

export default class MessageGroup extends Component {
  render() {
    return (
      <section className={`message-group ${this.props.activeUsername === this.props.conversation.sender ? 'mine' : ''} ${this.props.conversation.messages.length === 0 ? 'single-message' : ''}`}>
        {this.props.conversation.messages.map((message, index) => (
          <section className="message" key={index}>
            {index === 0 ? (
              <div className="message-sender-avatar">
                <UserAvatar username={this.props.conversation.sender} />
              </div>
            ) : <div className="blank-sender-avatar" />}
            <section className="message-content">{message.content}</section>
          </section>
        ))}
      </section>
    );
  }
}