import React, { Component } from 'react';
import MiniUserProfile from "./Profile/MiniUserProfile";
import Button from "@material-ui/core/Button/Button";

export default class ChatHeaderDrawer extends Component {
  render() {
    return (
      <section className={`chat-user-drawer ${this.props.open ? 'open' : ''}`}>
        <MiniUserProfile {...this.props} />
        <section className="actions-container">
          <section className="buttons">
            <Button variant="flat" color="default">Open Profile</Button>
            <Button variant="flat" color="default">Close Chat</Button>
            <Button variant="flat" color="secondary">Finish Conversation</Button>
          </section>
        </section>
      </section>
    );
  }
}