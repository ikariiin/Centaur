import React, { Component } from 'react';
import ChatPeopleSidebar from "./ChatPeople/ChatPeopleSidebar";
import ChatContent from "./Chat/ChatContent";
import "../../../Styles/Chat.scss";

export default class ChatApp extends Component {
  state = {
    activeChat: [
      null,
      null,
      null
    ]
  };

  setActiveChat = chatContext => {
    // This can probably be optimized, but its fine for now, I think?
    // TODO: Optimize for arbitrarily large number of windows.

    this.setState(prevState => {
      const activeChat = [...prevState.activeChat];

      // Fist check if the specified context is already open, if yes, short circuit.
      if(prevState.activeChat.includes(chatContext)) return prevState;

      if(prevState.activeChat[0] === null) {
        activeChat[0] = chatContext;
      } else if (prevState.activeChat[1] === null) {
        activeChat[1] = chatContext;
      } else if (prevState.activeChat[2] === null) {
        activeChat[2] = chatContext;
      } else {
        // If everything is open, just open it in the last window
        activeChat[2] = chatContext;
      }

      return {
        activeChat
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <ChatPeopleSidebar websocket={this.props.websocket} activeUsername={this.props.activeUsername} onChange={this.setActiveChat} />
        {this.state.activeChat.map((chat, index) => (
          <ChatContent chatContext={chat} websocket={this.props.websocket} activeUsername={this.props.activeUsername} key={index} />
        ))}
      </React.Fragment>
    )
  }
}