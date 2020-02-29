import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import "../../../../../../Styles/InputButtons.scss";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import LinkIcon from "@material-ui/icons/LinkOutlined";
import ImageUpload from "./Buttons/ImageUpload";
import { Emoji } from './Buttons/Emoji';

export default class InputButtons extends Component {
  render() {
    return (
      <section className={`input-buttons ${this.props.visible && 'open'}`}>
        <ImageUpload {...this.props} />
        <Emoji {...this.props} />
        <Tooltip title="Insert a link">
          <IconButton className="opt">
            <LinkIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </section>
    )
  }
}