import React, { Component } from 'react';
import ContextPage from "./ContextPage";

export default class SettingsPage extends Component {
  render() {
    return (
      <ContextPage pageIdentifier='settings'>
        page - settings
      </ContextPage>
    );
  }
}