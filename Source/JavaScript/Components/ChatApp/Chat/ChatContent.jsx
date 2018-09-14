import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import ChatHeader from "./ChatHeader";
import {NoActiveChat} from "./NoActiveChat";
import {Subscriber} from "../../../Functional/Subscriber";
import {SubscriptionsEnum} from "../../../Configuration/SubscriptionsEnum";
import InputForm from "./Messaging/Input/InputForm";
import Conversation from "./Messaging/Conversation";

export default class ChatContent extends Component {
  static subs = [SubscriptionsEnum.conversation];

  /**
   * @type {Subscriber}
   */
  subscriber = null;

  state = {
    conversation: []
  };

  onConversationEvent(data) {
    console.log(data);
  }

  subscribeToContext(context) {
    // Here we should be subscribing to another user in the websocket stream.
    const subscriber = new Subscriber(this.props.websocket);
    subscriber.subscribe(ChatContent.subs, (data) => this.onConversationEvent(data), {
      ...context
    });
    this.subscriber = subscriber;
  }

  removePreviousSubscription() {
    if(!this.subscriber) return;
    this.subscriber.unsubscribe(ChatContent.subs);
  }

  sendNewMessage(message) {
    console.log(message);
    this.setState(prevState => ({
      conversation: [
        ...prevState.conversation, {
          sender: this.props.activeUsername,
          content: message
        }
      ]
    }));
  }

  componentDidUpdate(prevProps) {
    if(this.props.chatContext !== prevProps.chatContext) {
      this.removePreviousSubscription();
      this.subscribeToContext(this.props.chatContext);
    }
  }

  componentWillUnmount() {
    this.removePreviousSubscription();
  }

  render() {
    return (
      <Paper elevation={0} className="chat-content">
        {this.props.chatContext
          ? (
            <React.Fragment>
              <ChatHeader context={this.props.chatContext} />
              <Conversation conversation={this.state.conversation} activeUsername={this.props.activeUsername} />
              <InputForm onMessageSend={(message) => this.sendNewMessage(message)} />
            </React.Fragment>
          )
          : <NoActiveChat />
        }
      </Paper>
    );
  }
}