/* eslint-disable react/display-name */
import React from "react";
import { Switch, Route } from "react-router";
import routes from "./constants/routes";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import Config from "./components/Config";
import Session from "./components/Session";
import ViewStream from "./components/ViewStream";

export default () => (
  <App>
    <Switch>
      <Route path={routes.SESSION} component={Session} />
      <Route path={routes.STREAM} component={ViewStream} />
      <Route path={routes.CONFIG} component={Config} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
