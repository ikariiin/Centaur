import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import "../../../../../../Styles/MessagingInput.scss";
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/AddOutlined';
import SendIcon from '@material-ui/icons/SendRounded';
import Button from "@material-ui/core/Button/Button";

export default class InputForm extends Component {
  render() {
    return (
      <section className="input-form">
        <Paper elevation={6} className="input-container">
          <IconButton>
            <AddIcon />
          </IconButton>
        </Paper>
        <Button variant="extendedFab" color="secondary" className="send-button">
          <SendIcon style={{ marginRight: '.5rem' }} />
          Send
        </Button>
      </section>
    );
  }
}