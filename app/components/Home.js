// @flow
import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { PythonShell } from "python-shell";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { ip: "" };
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

    netsurv.on("message", function(message) {
      // received a message sent from the Python script (a simple "print" statement)

      const messageObj = JSON.parse(message);

      if (messageObj.success) {
        console.log("success");
        return <Redirect to="/session" />;
      } else {
        console.log("failed");
      }
    });
  };

  render() {
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
