import React, { useState } from "react";

import { Form, Field } from "react-final-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function AddDeviceForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="deviceName"
            render={({ input }) => (
              <TextField
                {...input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="DeviceName"
                autoComplete="login"
                autoFocus
              />
            )}
          />

          <Field
            name="userId"
            render={({ input }) => (
              <TextField
                {...input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="userId"
                type="text"
                id="password"
                autoComplete="current-password"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            ADD
          </Button>
        </form>
      )}
    />
  );
}

export default AddDeviceForm;
