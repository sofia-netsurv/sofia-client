// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import Button from '@material-ui/core/Button';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  render() {
    return <Home />;
  }
}
