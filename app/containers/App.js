// @flow
import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route } from "react-router-dom";

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          {children}
        </React.Fragment>
      </Router>
    );
  }
}
