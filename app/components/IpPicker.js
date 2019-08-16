import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { onvif } from "onvif";
import { http } from "http";
import Cam from "onvif";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import VideocamIcon from "@material-ui/icons/VideocamOutlined";
import TextField from "@material-ui/core/TextField";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default class CamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ip: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ ip: event.target.value });
    this.props.parentChange(this.state.ip);
  }

  render() {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="ip"
        label="IP address"
        name="ip"
        autoFocus
        value={this.state.ip}
        onChange={this.handleChange}
      />
    );
  }
}
