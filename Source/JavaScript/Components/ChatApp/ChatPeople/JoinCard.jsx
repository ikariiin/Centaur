import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FriendAddIcon from "@material-ui/icons/PersonAddOutlined";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

export default class JoinCard extends Component {
  state = {
    codeInputValue: '',
    processing: false
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
    this.props.requestPair(this.state.codeInputValue);
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

  render() {
    return (
      <section className="join-code">
        {this.state.processing
          ? <div className="processing-container">Processing</div>
          : (
            <React.Fragment>
              <div className="title">Already have a join code from a friend?</div>
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
      </section>
    );
  }
}