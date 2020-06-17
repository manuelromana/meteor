import React from "react";
import { Route, Redirect, Switch } from "react-router";
import Layout from "./features/Layout";
import Home from "./Page/Home";
import Devices from "./Page/DevicesDisplay";
import AddDevice from "./features/AddDevice";
import TempDeviceDisplay from "./features/TemperatureDisplay";

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/devices" component={Devices}></Route>
        <Route exact path="/add/device" component={AddDevice}></Route>
        <Route
          exact
          path="/temp/device/:deviceId"
          component={TempDeviceDisplay}
        ></Route>
      </Switch>
    </Layout>
  );
}

function AuthenticateRoute() {
  let token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Routes></Routes>;
}

export default AuthenticateRoute;
