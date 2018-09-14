import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import "../../../../../../Styles/MessagingInput.scss";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/AddOutlined';
import SendIcon from '@material-ui/icons/SendRounded';
import Button from "@material-ui/core/Button/Button";

export default class InputForm extends Component {
  state = {
    inputValue: ''
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
    if(event.keyCode === 13) {
      // Handle enter
      this.triggerSendMessage(this.state.inputValue);
    }
  }

  triggerSendMessage(messageContent) {
    console.log(`Message Send: ${messageContent}`);

    this.props.onMessageSend(messageContent);

    this.setState({
      inputValue: ''
    });
  }

  render() {
    return (
      <section className="input-form">
        <Paper elevation={0} className="input-container">
          <IconButton>
            <AddIcon />
          </IconButton>
          <input className="input-element"
                 onChange={ev => this.updateInputValue(ev)}
                 value={this.state.inputValue}
                 placeholder="Start typing..."
                 onKeyDown={(ev) => this.handleKeyPress(ev)}
          />
        </Paper>
        <Button variant="extendedFab" color="secondary" className="send-button" onClick={(ev) => this.handleSendPress(ev)}>
          <SendIcon style={{ marginRight: '.5rem' }} />
          Send
        </Button>
      </section>
    );
  }
}