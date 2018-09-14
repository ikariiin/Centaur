import React, { Component } from 'react';
import PeopleList from "./PeopleList";
import MiniPersonalProfile from "./MiniPersonalProfile";

export default class ChatPeopleSidebar extends Component {
  render() {
    return (
      <aside className="chat-people-sidebar">
        <PeopleList {...this.props} />
        <MiniPersonalProfile {...this.props}  />
      </aside>
    )
  }
}