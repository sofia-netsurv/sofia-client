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

//var onvif = require("onvif");
import onvif from "onvif";
import { http } from "http";
import Cam from "onvif";

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function probeOnvif() {
  console.log("probing onvif");

  onvif.Discovery.on("device", function(cam, rinfo, xml) {
    // function will be called as soon as NVT responses
    console.log("Reply from " + rinfo.address);
    console.log(cam.hostname + ":" + cam.port + cam.path);
    this.state.detectedIPs.push(cam.hostname);

  });
  onvif.Discovery.probe();

  return true;
}

export default class CamPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ip: "", detectedIPs : ['192.168.3.1'], toSession: false };
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
    const ipList = ['192.168.3.1', '192.168.3.10'];

    const ipItems = this.state.detectedIPs.map((ip) =>
  
          <CamPickerItem key={ip.id} ip={ip} />
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
