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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default class CamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ip: "", toSession: false };
  }

  probeOnvif = () => {
    const PORT_TO_LISTEN = 3030;

    onvif.Discovery.on("device", function(cam, rinfo, xml) {
      // function will be called as soon as NVT responses
      console.log("Reply from " + rinfo.address);
      console.log(cam.hostname + ":" + cam.port + cam.path);
      cam.username = "admin";
      cam.password = "tlJwpbo6";

      const CAMERA_HOST = cam.hostname,
        USERNAME = cam.username,
        PASSWORD = cam.password,
        PORT = cam.port;

      const test_cam = new Cam(
        {
          hostname: CAMERA_HOST,
          username: USERNAME,
          password: PASSWORD,
          port: PORT
        },
        function(err) {
          if (err) {
            console.log(
              "Connection Failed for " +
                CAMERA_HOST +
                " Port: " +
                PORT +
                " Username: " +
                USERNAME +
                " Password: " +
                PASSWORD
            );
            return;
          }
          console.log("CONNECTED");
          this.absoluteMove({
            x: 1,
            y: 1,
            zoom: 1
          });
          this.getStreamUri({ protocol: "RTSP" }, function(err, stream) {
            console.log(stream.uri);
          });
          console.log(this.profiles);
        }
      );
    });
    onvif.Discovery.probe();
  };
  render() {
    return (
      <div>
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
        <List component="nav" aria-label="Main mailbox folders">
          <ListItem button>
            <VideocamIcon>
              <InboxIcon />
            </VideocamIcon>
            <ListItemText primary="192.168.1.156" />
          </ListItem>
          <ListItem button>
            <VideocamIcon>
              <DraftsIcon />
            </VideocamIcon>
            <ListItemText primary="192.168.1.139" />
          </ListItem>
        </List>
      </div>
    );
  }
}
