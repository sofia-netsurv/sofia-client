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
import TvIcon from "@material-ui/icons/Tv";
import BuildIcon from "@material-ui/icons/Build";

export default class Session extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state);
    console.log(this.props.location.state);
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
    const info = this.props.location.state.device_info;
    return (
      <>
        <h2>
          <VideocamIcon />
          {this.props.location.state.ip}
        </h2>

        <h3>
          <BuildIcon />
          Device Info
        </h3>
        <TableBody>
          <TableRow>
            <TableCell align="right">manufacturer</TableCell>
            <TableCell align="right">{info.manufacturer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">model</TableCell>
            <TableCell align="right">{info.model}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">firmwareVersion</TableCell>
            <TableCell align="right">{info.firmwareVersion}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">serialNumber</TableCell>
            <TableCell align="right">{info.serialNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">hardwareId</TableCell>
            <TableCell align="right">{info.hardwareId}</TableCell>
          </TableRow>
        </TableBody>

        <h3>
          <TvIcon />
          Stream Info
        </h3>
        <TableBody>
          <TableRow>
            <TableCell align="right">
              {this.props.location.state.rtsp_uri}
            </TableCell>
          </TableRow>
        </TableBody>

        <Button
          component={Link}
          to={{
            pathname: routes.CONFIG,
            state: {
              ip: this.props.location.state.ip,
              rtsp_uri: this.props.location.state.rtsp_uri,
              device_info: this.props.location.state.device_info
            }
          }}
        >
          Camera Config
        </Button>
        <Button
          component={Link}
          to={{
            pathname: routes.STREAM,
            state: {
              ip: this.props.location.state.ip,
              rtsp_uri: this.props.location.state.rtsp_uri,
              device_info: this.props.location.state.device_info
            }
          }}
        >
          View Stream
        </Button>
        <Button component={Link} to={routes.HOME}>
          Back
        </Button>
      </>
    );
  }
}
