import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

export default class ImageUpload extends Component {
  inputRef = React.createRef();

  triggerUpload() {
    this.inputRef.current.click();
  }

  handleImageUpload(ev) {
    const imageFile = this.inputRef.current.files[0];

    const fileReader = new FileReader();
    fileReader.onload = (ev) => this.props.onImageUpload(imageFile, ev.target.result);
    fileReader.readAsDataURL(imageFile);
  }

  render() {
    return (
      <React.Fragment>
        <Tooltip title="Upload an image">
          <IconButton className="opt" onClick={() => this.triggerUpload()}>
            <ImageIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <input type="file" ref={this.inputRef} style={{ display: 'none' }} accept="image/*" onChange={(ev) => this.handleImageUpload(ev)}  />
      </React.Fragment>
    );
  }
}