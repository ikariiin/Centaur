import React, { Component } from 'react';
import MessageGroup from "./MessageGroup";
import "../../../../../Styles/Conversation.scss";

export default class Conversation extends Component {
  state = {
    groupedConversation: []
  };

  bottom = null;

  groupConvo() {
    const convo = this.props.conversation;

    let lastSender = null;
    const mutated = [];

    convo.forEach(thread => {
      if(thread.sender === lastSender) {
        const lastIndex = mutated.length - 1;
        mutated[lastIndex].messages.push({
          ...thread
        });

        return;
      }

      mutated.push({
        sender: thread.sender,
        messages: [{
          ...thread
        }]
      });
      lastSender = thread.sender;
    });

    this.setState({
      groupedConversation: mutated
    }, () => this.scrollToBottom());
  }

  scrollToBottom() {
    this.bottom.scrollIntoView({behavior: 'smooth'});
  }

  componentDidMount() {
    this.groupConvo();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.conversation !== this.props.conversation) {
      // The possible reasons are that one of the messages was deleted or a new message was added.

      this.groupConvo();
    }
  }

  render() {
    return (
      <section className="conversation">
        {this.state.groupedConversation.length === 0
          ? (
            <section className="empty-conversation">
              No messages sent yet.
            </section>
          )
          : (this.state.groupedConversation.map((conversation, index) => (
            <MessageGroup key={index} conversation={conversation} activeUsername={this.props.activeUsername} />
          )))}
        <div ref={el => this.bottom = el} />
      </section>
    );
  }
}