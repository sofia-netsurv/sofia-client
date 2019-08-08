// @flow
import React, { Component } from "react";
import Session from "../components/Session";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

type Props = {};

export default class ConfigPage extends React.Component {
  props: Props;

  render() {
    return <Session />;
  }
}
