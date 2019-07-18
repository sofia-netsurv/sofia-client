// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import routes from '../constants/routes';
import styles from './Home.css';
import {PythonShell} from 'python-shell';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
        justifyContent: 'space-between'

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


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
      console.log(JSON.parse(message));

      

    });
  }

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
            value = {this.state.ip}
            onChange={this.handleChange}
          />
        <Button variant="contained"  onClick = {this.handleClick}>
          Connect
        </Button>

        <Button variant="contained"  onClick = {this.handleClick}>
          Browse
        </Button>
    </Container>
    );
  }
}
