import React, { Component } from 'react';
import Message from "./Message";
import ImageDisplay from "./ImageDisplay";

export default class ImageMessage extends Component {
  state = {
    imageViewer: false
  };

  openImageViewer() {
    this.setState({
      imageViewer: true
    });
  }

  closeImageViewer() {
    this.setState({
      imageViewer: false
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.imageViewer && <ImageDisplay imageUri={this.props.message.data.imageBase64} onClose={() => this.closeImageViewer()} />}
        <section className="message-content image-message">
          <div
            className={`image ${this.props.message.content.length === 0 && 'bottom-radius'}`}
            style={{ backgroundImage: `url(${this.props.message.data.imageBase64})` }}
            onClick={ () => this.openImageViewer() }
          />
          {this.props.message.content.length !== 0 && (
            <section className="content">
              {Message.getParsedMessage(this.props.message.content)}
            </section>
          )}
        </section>
      </React.Fragment>
    );
  }
}