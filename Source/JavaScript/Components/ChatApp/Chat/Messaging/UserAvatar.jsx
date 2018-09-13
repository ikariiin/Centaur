import React, { Component } from 'react';

export default class UserAvatar extends Component {
  render() {
    return (<section className="user-avatar">
      {this.props.username[0].toUpperCase()}
    </section>)
  }
}