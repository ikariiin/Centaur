import React, { Component } from 'react';
import ChatPeopleSidebar from "./ChatPeople/ChatPeopleSidebar";
import ChatContent from "./Chat/ChatContent";
import "../../../Styles/Chat.scss";

export default class ChatApp extends Component {
  state = {
    activeChat: null
  };

  setActiveChat = chatContext => this.setState({ activeChat: chatContext });

  render() {
    return (
      <React.Fragment>
        <ChatPeopleSidebar websocket={this.props.websocket} onChange={this.setActiveChat} />
        <ChatContent chatContext={this.state.activeChat} websocket={this.props.websocket} />
      </React.Fragment>
    )
  }
}