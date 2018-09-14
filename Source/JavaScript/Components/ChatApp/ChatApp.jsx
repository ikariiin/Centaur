import React, { Component } from 'react';
import ChatPeopleSidebar from "./ChatPeople/ChatPeopleSidebar";
import ChatContent from "./Chat/ChatContent";
import "../../../Styles/Chat.scss";

export default class ChatApp extends Component {
  state = {
    activeChat: [
      null
    ]
  };

  setActiveChat = chatContext => {
    // This can probably be optimized, but its fine for now, I think?
    this.setState(prevState => {
      if(prevState.activeChat.includes(chatContext)) return;

      return {
        activeChat: [
          chatContext
        ]
      }
      // return {
      //   activeChat: [
      //     ...prevState.activeChat,
      //     chatContext
      //   ]
      // };
    });
  };

  render() {
    return (
      <React.Fragment>
        <ChatPeopleSidebar websocket={this.props.websocket} activeUsername={this.props.activeUsername} onChange={this.setActiveChat} />
        <section className="chats-container">
          {this.state.activeChat.map((chat, index) => (
            <ChatContent chatContext={chat} websocket={this.props.websocket} activeUsername={this.props.activeUsername} key={index} />
          ))}
        </section>
      </React.Fragment>
    )
  }
}