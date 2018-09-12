import React, { Component } from 'react';
import ChatPage from "./ChatPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

export default class ContextPageHandler extends Component {
  getPage() {
    switch (this.props.context) {
      case 'chat':
        return <ChatPage websocket={this.props.websocket} />;
      case 'profile':
        return <ProfilePage websocket={this.props.websocket} />;
      case 'settings':
        return <SettingsPage websocket={this.props.websocket} />;
      default:
        throw new Error('Context not identified');
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getPage()}
      </React.Fragment>
    )
  }
}