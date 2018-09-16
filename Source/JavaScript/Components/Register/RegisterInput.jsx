import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper/Paper";

export class RegisterInput extends Component {
  inputRef = React.createRef();

  state = {
    isFocused: false
  };

  setFocus(ev) {
    this.setState({
      isFocused: true
    });
  }

  setOutFocus(ev) {
    this.setState({
      isFocused: false
    });
  }

  focusOnInput() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <Paper elevation={2} className={`register-input ${!this.state.isFocused && 'not-focused'}`} onClick={() => this.focusOnInput()}>
        <section className="label-container">
          {this.props.label || 'Label'}
        </section>
        <section className="input-container">
          <div className="icon-container">
            {this.props.icon}
          </div>
          {
            this.props.long
              ? (<textarea
                className={`input ${this.props.long && 'long'}`}
                onFocus={(ev) => this.setFocus(ev)}
                onBlur={(ev) => this.setOutFocus(ev)}
                ref={this.inputRef}
                placeholder={this.props.placeholder || 'Type here...'}
                onChange={this.props.onChange || (() => {})}
                value={this.props.value}
                rows={this.props.rows || 4}/>)
              : (<input
                className="input"
                onFocus={(ev) => this.setFocus(ev)}
                onBlur={(ev) => this.setOutFocus(ev)}
                ref={this.inputRef}
                placeholder={this.props.placeholder || 'Type here...'}
                onChange={this.props.onChange || (() => {})}
                value={this.props.value} />)
          }
        </section>
      </Paper>
    );
  }
}