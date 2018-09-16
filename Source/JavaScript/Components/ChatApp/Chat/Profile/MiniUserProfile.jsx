import React, { Component } from 'react';
import UserAvatar from "../../Chat/Messaging/UserAvatar";
import "../../../../../Styles/MiniProfiles.scss";
import Paper from "@material-ui/core/Paper/Paper";

export default class MiniUserProfile extends Component {
  render() {
    return (
      <Paper elevation={4} className="mini-user-profile">
        <section className="avatar-container">
          <UserAvatar username={this.props.username} />
        </section>
        <section className="details">
          <section className="username">{this.props.username}</section>
          <section className="misc">
            {this.props.details.userAbout.trim().length === 0 ? 'This user likes to keep a mystery surrounding them' : this.props.details.userAbout}
          </section>
        </section>
      </Paper>
    )
  }
}