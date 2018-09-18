import React, { Component } from 'react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

export default class UserAvatar extends Component {
  render() {
    return (
      <Tooltip title={this.props.username}>
        <section className="user-avatar">
          {this.props.username[0].toUpperCase()}
        </section>
      </Tooltip>
    );
  }
}