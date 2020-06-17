import React, { useState } from "react";
import Login from "./features/Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Authenticate from "./RoutesAuthenticated";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />

        <Authenticate></Authenticate>
      </Switch>
    </Router>
  );
}
