import React, { Component } from 'react';
import UserAvatar from "./UserAvatar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import ReactMarkdown from 'react-markdown';
import ImageMessage from "./ImageMessage";
import YoutubeMessage from "./YoutubeMessage";

export default class Message extends Component {
  static getParsedMessage(content) {
    return <ReactMarkdown source={content} />
  }

  analyzeMessage() {
    const message = this.props.message;

    if(/(youtu\.?be)\/.+$/.test(message.content)) {
      const ytId = /(youtu\.?be)\/.+$/.exec(message.content)[0].split('/')[1];

      return (
        <YoutubeMessage message={message} ytId={ytId} />
      );
    }

    if(message.data.flag === 'image') {
      // We need to return an image-y message
      return (
        <ImageMessage message={message} />
      );
    }

    return (
      <section className="message-content">
        {Message.getParsedMessage(message.content)}
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