import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import DoneIcon from "@material-ui/icons/DoneOutline";

export default class RegisterForm extends Component {
  state = {
    username: '',
    about: ''
  };

  changeField = field => ev => this.setState({
    [field]: ev.target.value
  });

  submit() {
    this.props.onRegister(this.state);
  }

  render() {
    return (
      <Paper elevation={24} className="register-form">
        <section className="title">
          Hold on to your butts!
        </section>
        <section className="input-container">
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={this.state.username}
            onChange={this.changeField('username')}
          />
          <TextField
            label="Something about yourself"
            multiline
            rows={4}
            margin="normal"
            fullWidth
            value={this.state.about}
            onChange={this.changeField('about')}
          />
        </section>
        <section className="button-container">
          <Button variant="extendedFab" color="primary" onClick={() => this.submit()}>
            Let's go! <DoneIcon style={{ marginLeft: '.5rem' }} />
          </Button>
        </section>
      </Paper>
    );
  }
}