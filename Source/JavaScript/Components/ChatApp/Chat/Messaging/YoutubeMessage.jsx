import React, { Component } from 'react';
import Message from "./Message";

export default class YoutubeMessage extends Component {
  render() {
    return (
      <section className="message-content youtube-message">
        <div
          className={`youtube ${this.props.message.content.length === 0 && 'bottom-radius'}`}
        >
          <iframe className="yt-iframe" allowFullScreen src={`https://www.youtube.com/embed/${this.props.ytId}`} frameBorder="0" allow="autoplay; encrypted-media" />
        </div>
        {this.props.message.content.length !== 0 && (
          <section className="content">
            {Message.getParsedMessage(this.props.message.content)}
          </section>
        )}
      </section>
    );
  }
}