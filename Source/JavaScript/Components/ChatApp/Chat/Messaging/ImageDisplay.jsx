import React from 'react';
import "../../../../../Styles/ImageDisplay.scss";

export default class ImageDisplay extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.setState({
      open: true
    });
  }

  render() {
    return (
      <section className={`image-display-container ${this.state.open && 'open'}`} onClick={this.props.onClose}>
        <img src={this.props.imageUri} className={`image-display`} onClick={(ev) => ev.stopPropagation()} />
      </section>
    );
  }
}