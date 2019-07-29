/* eslint-disable react/display-name */
import React from "react";
import { Switch, Route } from "react-router";
import routes from "./constants/routes";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import Session from "./components/Session";

export default () => (
  <App>
    <Switch>
      <Route path={routes.SESSION} component={Session} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
