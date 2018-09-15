import React, { Component } from 'react';
import ChatPage from "./ChatPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

export default class ContextPageHandler extends Component {
  getPage() {
    switch (this.props.context) {
      case 'chat':
        return <ChatPage {...this.props} />;
      case 'profile':
        return <ProfilePage {...this.props} />;
      case 'settings':
        return <SettingsPage {...this.props} />;
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