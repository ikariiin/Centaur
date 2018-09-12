import React, { Component } from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";

export default class ChatHeader extends Component {
  render() {
    return (
      <AppBar position="static" color="primary" className="chat-header">
        <Toolbar>
          <Avatar>{this.props.context.username[0].toUpperCase()}</Avatar>
          <Typography variant="title" className="person-username">
            { this.props.context.username }
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}