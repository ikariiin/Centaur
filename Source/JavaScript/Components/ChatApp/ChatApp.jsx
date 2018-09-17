import React, { Component } from 'react';
import ChatPeopleSidebar from "./ChatPeople/ChatPeopleSidebar";
import ChatContent from "./Chat/ChatContent";
import "../../../Styles/Chat.scss";
import {Subscriber} from "../../Functional/Subscriber";
import {SubscriptionsEnum} from "../../Configuration/SubscriptionsEnum";

export default class ChatApp extends Component {
  static SUBSCRIPTIONS = [SubscriptionsEnum.conversation_start];

  state = {
    activeChat: [
      null
    ]
  };
  addNewPerson = (person, code) => {};
  openConversation = (person) => {};

  setActiveChat = chatContext => {
    // This can probably be optimized, but its fine for now, I think?
    this.setState(prevState => {
      if(prevState.activeChat.includes(chatContext)) return;

      return {
        activeChat: [
          chatContext
        ]
      };
    });
  };

  handleConversationStart(data) {
    if(data.pairWith !== this.props.joinCode || data.type !== 'event') return;

    this.addNewPerson(data.data, data.joinCode);
    this.openConversation({
      ...data.data,
      code: data.joinCode,
      active: true
    });
  }

  componentDidMount() {
    const subscriber = new Subscriber(this.props.websocket);
    subscriber.subscribe(ChatApp.SUBSCRIPTIONS, (data) => this.handleConversationStart(data));
  }

  render() {
    return (
      <React.Fragment>
        <ChatPeopleSidebar
          {...this.props}
          onChange={this.setActiveChat}
          setAddNewPerson={(handler) => this.addNewPerson = handler}
          setOpenConversation={(handler) => this.openConversation = handler}
        />
        <section className="chats-container">
          {this.state.activeChat.map((chat, index) => (
            <ChatContent chatContext={chat} {...this.props} key={index} />
          ))}
        </section>
      </React.Fragment>
    )
  }
}