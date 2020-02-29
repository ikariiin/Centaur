import React from 'react';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import EmojiIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import IconButton from "@material-ui/core/IconButton/IconButton";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'

export class Emoji extends React.Component {
  state = {
    visiblePicker: false
  };

  addEmoji(emoji, event) {
    event.stopPropagation();
    this.setState({
      visiblePicker: false
    });
    console.log(emoji);
  }

  emojiPanel() {
    if(!this.state.visiblePicker) return null;

    return (
      <section className="emoji-picker-contianer" onClick={() => this.setState({ visiblePicker: false })}>
        <Picker native darkMode title="Pick an emoji" onClick={(emoji, ev) => this.addEmoji(emoji, ev)} />
      </section>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.emojiPanel()}
        <Tooltip title="Insert an emoji">
          <IconButton className="opt" onClick={() => this.setState(prevState => ({ ...prevState, visiblePicker: !prevState.visiblePicker }))}>
            <EmojiIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}