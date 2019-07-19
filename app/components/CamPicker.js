// @flow
import React, { Component } from "react";
import Button from "@material-ui/core/Button";

type Props = {
  counter: number
};

export default class CamPicker extends Component<Props> {
  props: Props;

  render() {
    return (
      <Button variant="contained" onClick={this.handleClick}>
        Picker
      </Button>
    );
  }
}
