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
            {this.props.activeUserAbout.trim().length === 0 ? 'This user likes to keep a mystery surrounding them' : this.props.activeUserAbout}
          </section>
        </section>
      </Paper>
    )
  }
}