import React, { Component } from 'react';
import ContextPage from "./ContextPage";
import ChatApp from "../ChatApp/ChatApp";

export default class ChatPage extends Component {
  render() {
    return (
      <ContextPage pageIdentifier='chat'>
        <ChatApp {...this.props} />
      </ContextPage>
    );
  }
}