/* eslint-disable react/prop-types */
// @flow
import React from "react";
import jsmpeg from "jsmpeg";
import Stream from "node-rtsp-stream";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import VideocamIcon from "@material-ui/icons/VideocamOutlined";
import ConfigTabs from "../components/ConfigTabs";

export default class ViewStream extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    console.log(this.props.location.state);
  }
  componentDidMount() {
    console.log("starting RTSP transcoder");
  }

  render() {
    return (
      <>
        <h2>
          <VideocamIcon />
          {this.props.location.state.ip}
        </h2>
        <Button
          component={Link}
          to={{
            pathname: routes.SESSION,
            state: {
              ip: this.props.location.state.ip,
              rtsp_uri: this.props.location.state.rtsp_uri,
              device_info: this.props.location.state.device_info
            }
          }}
        >
          Back
        </Button>
      </>
    );
  }
}
