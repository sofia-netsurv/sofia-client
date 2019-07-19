// @flow
import * as React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        {children}
      </React.Fragment>
    );
  }
}
