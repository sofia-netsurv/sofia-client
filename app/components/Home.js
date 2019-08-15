import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Stream from "node-rtsp-stream";

import { PythonShell } from "python-shell";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";
import { browserHistory } from "react-router";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import routes from "../constants/routes";
import CamPicker from "../components/CamPicker";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { ip: "", toSession: false };
  }

  handleChange = event => {
    this.setState({ ip: event.target.value });
  };

  handleClick = () => {
    let options = {
      mode: "text",
      args: ["nodemsg"]
    };
    console.log(this.state.ip);
    let netsurv = new PythonShell("python-netsurv/connect.py", options);
    netsurv.send(this.state.ip);
    let homeThis = this;
    netsurv.on("message", function(message) {
      const messageObj = JSON.parse(message);

      if (messageObj.success) {
        console.log("reached");
        homeThis.setState({ toSession: true });
        console.log("success");
      } else {
        this.setState({ toSession: false });
        console.log("failed");
      }
    });
  };

  render() {
    return (
      <>
        <Typography component="h1" variant="h5">
          Select Camera
        </Typography>
        <CamPicker />

      </>
    );
  }
}
export default withRouter(Home);
