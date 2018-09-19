import React, { Component } from 'react';
import UserAvatar from "./UserAvatar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';

export default class Message extends Component {
  analyzeMessage() {
    const message = this.props.message;
    if(message.data.flag === 'image') {
      // We need to return an image-y message
      const imageData = message.data.imageBase64;

      return (
        <section className="message-content image-message">
          <div className={`image ${message.content.length === 0 && 'bottom-radius'}`} style={{ backgroundImage: `url(${imageData})` }} />
          {message.content.length !== 0 && (
            <section className="content">
              {message.content}
            </section>
          )}
        </section>
      );
    }

    return (
      <section className="message-content">
        {message.content}
      </section>
    );
  }

  render() {
    return (
      <section className="message">
        {this.props.index === 0 ? (
          <div className="message-sender-avatar">
            <UserAvatar username={this.props.sender} />
          </div>
        ) : <div className="blank-sender-avatar" />}
        {this.analyzeMessage()}
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