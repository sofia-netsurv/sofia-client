// @flow
import React, { Component } from "react";
import Home from "../components/Home";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import routes from "../constants/routes";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Home />
      </Container>
    );
  }
}
