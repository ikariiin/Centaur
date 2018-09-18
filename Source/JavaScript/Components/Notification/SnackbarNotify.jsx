import React from 'react';
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import CloseIcon from "@material-ui/icons/CloseOutlined";

export const SnackbarNotify = props => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={props.open}
    autoHideDuration={props.duration || 10000}
    onClose={props.onClose}
    ContentProps={{
      'aria-describedby': 'new-chat-message',
    }}
    message={<span id="new-chat-message">{props.message}</span>}
    action={[
      ...props.actions,
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={props.onClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);