import React, { Component } from 'react';
import UserAvatar from "../Chat/Messaging/UserAvatar";
import "../../../../Styles/MiniProfiles.scss";
import Paper from "@material-ui/core/Paper/Paper";

export default class MiniPersonalProfile extends Component {
  render() {
    return (
      <Paper elevation={4} className="mini-personal-profile">
        <section className="avatar-container">
          <UserAvatar username={this.props.activeUsername} />
        </section>
        <section className="details">
          <section className="username">{this.props.activeUsername}</section>
          <section className="misc">
            We are gonna have some super important stuff here about the user here.
          </section>
        </section>
      </Paper>
    )
  }
}