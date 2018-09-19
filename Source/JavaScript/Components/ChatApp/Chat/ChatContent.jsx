import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import ChatHeader from "./ChatHeader";
import {NoActiveChat} from "./NoActiveChat";
import {Subscriber} from "../../../Functional/Subscriber";
import {SubscriptionsEnum} from "../../../Configuration/SubscriptionsEnum";
import InputForm from "./Messaging/Input/InputForm";
import Conversation from "./Messaging/Conversation";
import {Sender} from "../../../Functional/Sender";
import {ConversationOver} from "./ConversationOver";

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
    if(data.type === "event message-send") {
      const message = {
        sender: data.fromUsername,
        content: data.message,
        data: data.data
      };
      if(data.fromCode === this.props.chatContext.code) {
        this.setState(prevState => ({
          conversation: [
            ...prevState.conversation, {
              ...message
            }
          ]
        }));
        this.props.storeAppendConversation(data.fromCode, message);
        return;
      }

      // Also put a notification somewhere for a new message has been received?
      this.props.showNotification(`${data.fromUsername}: ${data.message}`);
      this.props.storeAppendConversation(data.fromCode, message);
    }
  }

  subscribeToContext(context) {
    // Here we should be subscribing to another user in the websocket stream.
    const subscriber = new Subscriber(this.props.websocket);
    subscriber.subscribe(ChatContent.subs, (data) => this.onConversationEvent(data), {
      ...context,
      myCode: this.props.joinCode
    });
    this.subscriber = subscriber;
  }

  removePreviousSubscription() {
    if(!this.subscriber) return;
    this.subscriber.unsubscribe(ChatContent.subs);
  }

  sendToSocket(message, data) {
    const sender = new Sender(this.props.websocket);
    sender.sendMessage(
      this.props.activeUsername,
      message,
      this.props.chatContext.username,
      this.props.chatContext.code,
      this.props.joinCode,
      data
    );
  }

  sendNewMessage(message, data) {
    this.setState(prevState => ({
      conversation: [
        ...prevState.conversation, {
          sender: this.props.activeUsername,
          content: message,
          data
        }
      ]
    }));
    this.props.storeAppendConversation(this.props.chatContext.code, {
      sender: this.props.activeUsername,
      content: message,
      data
    });

    // Send a message
    this.sendToSocket(message, data);
  }

  updateConversation() {
    this.setState({
      conversation: this.props.chatContext ? this.props.storeGetConversation(this.props.chatContext.code) : []
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.chatContext !== prevProps.chatContext) {
      // Update the conversation.
      this.updateConversation();

      this.removePreviousSubscription();
      this.subscribeToContext(this.props.chatContext);
    }
  }

  componentWillUnmount() {
    this.removePreviousSubscription();
  }

  componentDidMount() {
    this.updateConversation();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.chatContext
          ? (
            <Paper elevation={0} className="chat-content">
              <ChatHeader context={this.props.chatContext} />
              <Conversation conversation={this.state.conversation} activeUsername={this.props.activeUsername} />
              {this.props.chatContext.active
                ? <InputForm onMessageSend={(message, data = {}) => this.sendNewMessage(message, data)} {...this.props} />
                : <ConversationOver />}
            </Paper>)
          : <NoActiveChat />}
      </React.Fragment>
    );
  }
}