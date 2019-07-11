// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Button variant="contained" color="primary">
        Hello World
      </Button>

    );
  }
}
