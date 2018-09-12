import React, { Component } from 'react';
import ContextPage from "./ContextPage";

export default class ProfilePage extends Component {
  render() {
    return (
      <ContextPage pageIdentifier='profile'>
        page - profile
      </ContextPage>
    );
  }
}