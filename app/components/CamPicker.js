// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Counter.css';
import routes from '../constants/routes';


type Props = {
  counter: number
};

export default class CamPicker extends Component<Props> {
    props: Props;

  render() {
    const {
      counter
    } = this.props;
    return (
        <Button variant="contained"  onClick = {this.handleClick}>
          Picker
        </Button>
    )
  }
}
