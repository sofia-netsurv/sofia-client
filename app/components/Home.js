// @flow
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Stream from "node-rtsp-stream";
import { Link } from "react-router-dom";

import { PythonShell } from "python-shell";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";
import { browserHistory } from "react-router";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import routes from "../constants/routes";

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
    console.log(this.state.toSession);
    if (this.state.toSession == true) {
      return <Redirect to="{routes.COUNTER}" />;
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            Select Camera
          </Typography>

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

          <Button variant="contained" onClick={this.handleClick}>
            Connect
          </Button>

          <Button variant="contained" onClick={this.handleClick}>
            Browse
          </Button>
        </Container>
      );
    }
  }
}
export default withRouter(Home);
