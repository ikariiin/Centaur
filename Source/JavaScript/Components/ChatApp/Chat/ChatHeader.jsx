import React, { Component } from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import ChatHeaderDrawer from "./ChatHeaderDrawer";

export default class ChatHeader extends Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer(ev) {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen
    }));
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" color="primary" className="chat-header">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 10 }} onClick={(ev) => this.toggleDrawer(ev)}>
              <MenuIcon />
            </IconButton>
            <Avatar>{this.props.context.username[0].toUpperCase()}</Avatar>
            <Typography variant="title" className="person-username">
              { this.props.context.username }
            </Typography>
          </Toolbar>
        </AppBar>
        <ChatHeaderDrawer open={this.state.drawerOpen} username={this.props.context.username} />
      </React.Fragment>
    );
  }
}