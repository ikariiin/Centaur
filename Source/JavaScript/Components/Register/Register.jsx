import React, { Component } from 'react';
import RegisterForm from "./RegisterForm";
import "../../../Styles/Register.scss";

export default class Register extends Component {
  render() {
    return (
      <section className="register-overlay">
        <RegisterForm {...this.props} />
      </section>
    )
  }
}