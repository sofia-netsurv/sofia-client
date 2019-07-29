// @flow
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import VideocamIcon from "@material-ui/icons/VideocamOutlined";
import TextField from "@material-ui/core/TextField";
import CamPickerItem from "../components/CamPickerItem";
import IpPicker from "../components/IpPicker";
import routes from "../constants/routes";
import { Link } from "react-router-dom";

import onvif from "onvif";
import { http } from "http";
import { Cam } from "onvif";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function probeOnvif() {
  let parentThis = this;
  console.log("probing onvif");

  onvif.Discovery.on("device", function(cam, rinfo, xml) {
  var rtsp_cam = new Cam(
    {
      hostname: cam.hostname,
      username: "admin",
      password: "tlJwpbo6",
      port: cam.port
    },
    function(err) {
      this.getStreamUri({ protocol: "RTSP" }, function(err, stream) {
        var joinedDevices = this.state.detectedDevices.concat({ ip: rtsp_cam.hostname, uri: stream.uri });
        this.setState({ detectedDevices: joinedDevices })
      });
    }
  );
});

  onvif.Discovery.probe();
}

export default class CamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ip: "", detectedDevices : [], toSession: false };
            this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount = () => {
    probeOnvif();
  };


  handleChange(ip) {
    this.setState({ip: event.target.value});
    console.log(ip);
  }

  render() {

    const ipItems = this.state.detectedDevices.map((device) =>

          <CamPickerItem key={device.id} ip={device.ip} />
  );


    return (
      <>
      <div>
        <IpPicker parentChange = {this.handleChange} />
        <List component="nav" aria-label="Main mailbox folders">
          {ipItems}
        </List>
      </div>
       <Button variant="contained"

        component={Link}
        to={{
          pathname: routes.SESSION,
          state: {
            ip: this.state.ip
          }
        }}
>
          Connect
        </Button>
        </>
    );
  }
}
