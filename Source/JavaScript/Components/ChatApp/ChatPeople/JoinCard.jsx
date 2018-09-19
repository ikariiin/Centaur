import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FriendAddIcon from "@material-ui/icons/PersonAddOutlined";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import AddIcon from "@material-ui/icons/AddOutlined";
import NegateIcon from "@material-ui/icons/RemoveOutlined";

export default class JoinCard extends Component {
  state = {
    codeInputValue: '',
    processing: false,
    collapsed: true
  };

  updateCodeInputValue(event) {
    this.setState({
      codeInputValue: event.target.value
    });
  }

  copyToClipboard() {
    window.navigator.clipboard.writeText(this.props.joinCode);
  }

  addUser() {
    if(this.state.codeInputValue.trim().length !== 0) {
      this.props.requestPair(this.state.codeInputValue);
    }
    this.setState({
      // processing: true,
      codeInputValue: ''
    });
  }

  handleEnterPress(event) {
    if(event.keyCode === 13) {
      this.addUser();
    }
  }

  getCollapseToggleButton() {
    if(this.state.collapsed) {
      return <AddIcon style={{ fontSize: 'inherit', color: 'inherit' }} />;
    } else {
      return <NegateIcon style={{ fontSize: 'inherit', color: 'inherit' }} />;
    }
  }

  toggleCollapse() {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  }

  render() {
    return (
      <section className="join-code">
        {this.state.processing
          ? <div className="processing-container">Processing</div>
          : (
            <React.Fragment>
              <div className="title" onClick={() => this.toggleCollapse()}>
                <section className="text-content">
                  Join Code, already have one? Get yours.
                </section>
                <Tooltip title="Toggle Collapse">
                  <div className="toggle-button">
                    {this.getCollapseToggleButton()}
                  </div>
                </Tooltip>
              </div>
              {!this.state.collapsed && (
                <React.Fragment>
                  <TextField
                    label="Join Code"
                    fullWidth
                    onChange={(ev) => this.updateCodeInputValue(ev)}
                    value={this.state.codeInputValue}
                    onKeyDown={(ev) => this.handleEnterPress(ev)}
                    margin="dense"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <FriendAddIcon onClick={() => this.addUser()} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <div className="my-code-container">
                    Your join code:
                    <Tooltip title="Click to copy">
                      <span className="my-code" onClick={() => this.copyToClipboard()}>{this.props.joinCode}</span>
                    </Tooltip>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
      </section>
    );
  }
}