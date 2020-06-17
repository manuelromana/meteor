import React, { useState } from "react";

import axios from "axios";
import LoginForm from "./LoginForm";
import { Route, Redirect, Switch } from "react-router";

export default function Login() {
  const [authenticate, setAuthenticate] = useState({});

  async function loginPost(credentials) {
    const result = await axios.post("http://my-app.fr/user/login", credentials);
    setAuthenticate(result.data);
  }
  if (authenticate.token) {
    console.log(authenticate.token);
    localStorage.setItem("token", authenticate.token);
    return <Redirect to="/" />;
  }

  return (
    <div>
      <LoginForm onSubmit={data => loginPost(data)} />
    </div>
  );
}
