import React, { Component } from 'react';
import PeopleList from "./PeopleList";

export default class ChatPeopleSidebar extends Component {
  render() {
    return (
      <aside className="chat-people-sidebar">
        <PeopleList {...this.props} />
      </aside>
    )
  }
}