import React, { Component } from 'react';
import UserAvatar from "./UserAvatar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

export default class Message extends Component {
  render() {
    return (
      <section className="message">
        {this.props.index === 0 ? (
          <div className="message-sender-avatar">
            <UserAvatar username={this.props.sender} />
          </div>
        ) : <div className="blank-sender-avatar" />}
        <section className="message-content">{this.props.message.content}</section>
        <section className='message-button-container'>
          <IconButton className="message-menu-button">
            <MoreVertIcon style={{ fontSize: '1.3rem' }} />
          </IconButton>
          <IconButton className="message-menu-button">
            <InfoIcon style={{ fontSize: '1.3rem' }} />
          </IconButton>
        </section>
      </section>
    );
  }
}