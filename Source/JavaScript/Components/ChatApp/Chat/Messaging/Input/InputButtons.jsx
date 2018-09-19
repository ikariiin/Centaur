import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import "../../../../../../Styles/InputButtons.scss";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import LinkIcon from "@material-ui/icons/LinkOutlined";
import ImageUpload from "./Buttons/ImageUpload";

export default class InputButtons extends Component {
  render() {
    return (
      <section className={`input-buttons ${this.props.visible && 'open'}`}>
        <ImageUpload {...this.props} />
        <Tooltip title="Insert an emoji">
          <IconButton className="opt">
            <EmojiIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert a link">
          <IconButton className="opt">
            <LinkIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </section>
    )
  }
}