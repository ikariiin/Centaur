import React, { Component } from 'react';
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

export default class ChatHeaderDrawer extends Component {
  render() {
    return (
      <section className={`chat-user-drawer ${this.props.open ? 'open' : ''}`}>
        <List>
          <ListItem button={true}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button={true}>
            <ListItemText primary="Some Other Stuff" />
          </ListItem>
          <ListItem button={true}>
            <ListItemText primary="More Stuff" />
          </ListItem>
          <ListItem button={true}>
            <ListItemText primary="Kewl Stuff" />
          </ListItem>
        </List>
      </section>
    );
  }
}