import React, { useState } from 'react';

import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function LoginForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="username"
            render={({ input }) => (
              <TextField
                {...input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login"
                autoComplete="login"
                autoFocus
              />
            )}
          />

          <Field
            name="password"
            render={({ input }) => (
              <TextField
                {...input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            se connecter
          </Button>
        </form>
      )}
    />
  );
}

export default LoginForm;
