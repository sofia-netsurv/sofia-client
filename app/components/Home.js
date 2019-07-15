// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import routes from '../constants/routes';
import styles from './Home.css';
import {PythonShell} from 'python-shell';

export default class Home extends React.Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {ip: ''};
}


  handleChange = (event) => {
      this.setState({ip: event.target.value});

  }

  handleClick = () => {
    let options = {
      mode: 'text',
      args: ['nodemsg']
    };

    console.log(this.state.ip)
    let netsurv = new PythonShell('python-netsurv/connect.py', options);
    netsurv.send(this.state.ip);

    netsurv.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });
  }

  render() {
    return (
      <>
      <TextField id="ip" type="text" value = {this.state.ip} onChange={this.handleChange} />
      <Button variant="contained" onClick = {this.handleClick} color="primary">
        Connect
      </Button>
      </>
    );
  }
}
