import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import DoneIcon from "@material-ui/icons/DoneOutline";
import {RegisterInput} from "./RegisterInput";
import PersonIcon from "@material-ui/icons/PersonOutline";
import EditIcon from "@material-ui/icons/EditOutlined";

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
        <section className="column form">
          <section className="title">
            Hold on to your butts!
          </section>
          <section className="input-container">
            <RegisterInput
              icon={<PersonIcon style={{ fontSize: 'inherit' }} />}
              label="Username"
              onChange={this.changeField('username')}
              value={this.state.username}
            />
            <RegisterInput
              icon={<EditIcon style={{ fontSize: 'inherit' }} />}
              label="Something about yourself"
              value={this.state.about}
              onChange={this.changeField('about')}
            />
          </section>
          <section className="button-container">
            <Button variant="extendedFab" color="primary" onClick={() => this.submit()}>
              Let's go! <DoneIcon style={{ marginLeft: '.5rem' }} />
            </Button>
          </section>
        </section>
        <section className="column about">
          <div className="title">
            Centaur
          </div>
          <section className="app-about">
            <p>
              This app allows you to chat with people in a minimalistic way
              and doesn't leave any history.
              You get a join code / link from a friend and use it to connect to them,
              and get to chat with them with a minimalistic approach.
            </p>
            <p>
              Get in here, log right in.
            </p>
          </section>
        </section>
      </Paper>
    );
  }
}