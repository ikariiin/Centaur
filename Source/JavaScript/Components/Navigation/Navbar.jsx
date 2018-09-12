import React, { PureComponent } from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
import ChatIcon from '@material-ui/icons/ChatOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ProfileIcon from '@material-ui/icons/AccountBoxOutlined';

export default class Navbar extends PureComponent {
  contextPages = [
    'chat',
    'profile',
    'settings',
  ];

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.props.onChange(this.contextPages[value]);
    this.setState({
      value
    });
  };

  render() {
    return (
      <BottomNavigation
        value={this.state.value}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    );
  }
}