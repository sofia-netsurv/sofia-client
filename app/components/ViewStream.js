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
import JSMpeg from "jsmpeg-player";

export default class ViewStream extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    console.log(this.props.location.state);
  }
  componentDidMount() {
    console.log("starting RTSP transcoder");
    this.stream = new Stream({
      name: "name",
      streamUrl: this.props.location.state.rtsp_uri,
      wsPort: 9999,
      ffmpegOptions: {
        // options ffmpeg flags
        "-stats": "", // an option with no neccessary value uses a blank string
        "-r": 30 // options with required values specify the value after the key
      }
    });
    console.log(document.getElementById("videoWrapper"));
    this.player = new JSMpeg.VideoElement(
      document.getElementById("videoWrapper"),
      "ws://localhost:9999"
    );
  }
  componentWillUnmount() {
    this.stream.stop();
    this.player.destroy();
  }

  render() {
    return (
      <>
        <h2>
          <VideocamIcon />
          {this.props.location.state.ip}
        </h2>

        <div
          id="videoWrapper"
          style={{ height: 480, width: 640, position: "relative" }}
        />
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
