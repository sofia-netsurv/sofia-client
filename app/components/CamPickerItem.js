/* eslint-disable react/prop-types */
// @flow
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
import { Link } from "react-router-dom";
import routes from "../constants/routes";

export default class CamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ListItem button component={Link} to={routes.SESSION}>
        <VideocamIcon>
          <InboxIcon />
        </VideocamIcon>
        <ListItemText primary={this.props.ip} />
      </ListItem>
    );
  }
}
