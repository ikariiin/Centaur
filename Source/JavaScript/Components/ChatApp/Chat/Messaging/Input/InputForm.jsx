const uuid = require('uuid/v1');
import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import "../../../../../../Styles/MessagingInput.scss";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/AddOutlined';
import SendIcon from '@material-ui/icons/SendRounded';
import Button from "@material-ui/core/Button/Button";
import InputButtons from "./InputButtons";
import {ImagePreviewBar} from "./ImagePreviewBar";

export default class InputForm extends Component {
  state = {
    inputValue: '',
    inputButtons: false,
    imageFile: [],
    imageBase64: [],
    showImagePreview: false
  };

  updateInputValue(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleSendPress(event) {
    this.triggerSendMessage(this.state.inputValue);
  }

  handleKeyPress(event) {
    if(event.keyCode === 13 && !event.shiftKey) {
      // Handle enter
      this.triggerSendMessage(this.state.inputValue);
      event.preventDefault();
    }
  }

  triggerSendMessage(messageContent) {
    if(this.state.imageFile.length !== 0) {
      this.props.onMessageSend(messageContent, {
        flag: 'image',
        imageBase64: this.state.imageBase64[0].base64
      });
      this.setState({
        imageFile: [],
        imageBase64: []
      });
    } else {
      if(messageContent.trim().length === 0) return;

      this.props.onMessageSend(messageContent);
    }

    this.setState({
      inputValue: ''
    });
  }

  onImageUpload(file, base64) {
    // We will add a thumbnail preview for the message in the form. And then wait for the current message send trigger.
    this.setState({
      imageFile: [{
        file,
        id: uuid()
      }],
      imageBase64: [{
        base64,
        id: uuid()
      }],
      showImagePreview: true,
      inputButtons: false
    });
  }

  toggleInputButtons() {
    this.setState(prevState => ({
      inputButtons: !prevState.inputButtons
    }));
  }

  removeImage(id) {
    this.setState(prevState => ({
      imageFile: prevState.imageFile.filter((val) => val.id !== id),
      imageBase64: prevState.imageBase64.filter((val) => val.id !== id),
    }));
  }

  render() {
    return (
      <section className="input-form">
        <ImagePreviewBar files={this.state.imageFile} base64Images={this.state.imageBase64} removeImage={(id) => this.removeImage(id)} />
        <section className="inputs">
          <Paper elevation={0} className="input-container">
            <IconButton onClick={() => this.toggleInputButtons()} color="secondary">
              <AddIcon />
            </IconButton>
            <InputButtons onImageUpload={(file, base64) => this.onImageUpload(file, base64)} visible={this.state.inputButtons} {...this.props} />
            <textarea className="input-element"
                      onChange={ev => this.updateInputValue(ev)}
                      value={this.state.inputValue}
                      placeholder="Start typing..."
                      onKeyDown={(ev) => this.handleKeyPress(ev)}
                      autoFocus={true}
            />
          </Paper>
          <Button variant="extendedFab" color="secondary" className="send-button" onClick={(ev) => this.handleSendPress(ev)}>
            <SendIcon style={{ marginRight: '.5rem' }} />
            Send
          </Button>
        </section>
      </section>
    );
  }
}