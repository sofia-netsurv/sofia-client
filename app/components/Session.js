/* eslint-disable react/prop-types */
// @flow
import React from "react";
import jsmpeg from "jsmpeg";
import Stream from "node-rtsp-stream";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import routes from "../constants/routes";

export default class Session extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state)
  }

  startStream = (ip, wsPort) => {};

  connect = wsPort => {
    var stream = new Stream({
      name: "name",
      streamUrl: `rtsp://1.72.239.149/vod/mp4:BigBuckBunny_115k.mov`,
      wsPort: 9999,
      ffmpegOptions: {
        // options ffmpeg flags
        "-stats": "", // an option with no neccessary value uses a blank string
        "-r": 30 // options with required values specify the value after the key
      }
    });

    const client = new WebSocket(`ws://localhost:{$wsPort}`);
    const player = new jsmpeg.Player(client, {
      canvas: "canvas" // Canvas should be a canvas DOM element
    });
  };

  render() {
    return (
      <>
        <h1>{this.props.location.state.ip}</h1>
          <p>{this.props.location.state.rtsp_uri}</p>
        <Button>Camera Config</Button>
        <Button>View Stream</Button>
        <Button component={Link} to={routes.HOME}>
          Back
        </Button>
      </>
    );
  }
}
