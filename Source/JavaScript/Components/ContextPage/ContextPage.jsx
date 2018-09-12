import React, { Component } from 'react';

export default class ContextPage extends Component {
  state = {
    enter: false,
    exit: false
  };

  componentDidMount() {
    this.setState({
      enter: true
    });
  }

  componentWillUnmount() {
    // Possibly devise some way to implement exit animations during unmount?
  }

  render() {
    return (
      <section className={`context-page ${this.state.enter && 'enter'} ${this.props.pageIdentifier}`}>
        { this.props.children }
      </section>
    )
  }
};