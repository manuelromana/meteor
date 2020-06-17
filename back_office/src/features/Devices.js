import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import deleteDevice from "./DeleteDevice";

export default function DevicesTable() {
  const [devices, setDevices] = useState(false);
  const [reloading, setReloading] = useState(false);

  async function getDevices() {
    const result = await axios.get("http://my-app.fr/device/");
    setDevices(result.data);
  }

  useEffect(() => {
    getDevices();
  }, [reloading]);

  console.log(devices);
  if (!devices) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DeviceId</TableCell>
              <TableCell>DeviceName</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {devices && (
            <TableBody>
              {devices.map(device => (
                <TableRow key={device.id}>
                  <TableCell>{device.id}</TableCell>
                  <TableCell>{device.deviceName}</TableCell>
                  <TableCell>
                    <ButtonActions
                      setReloading={setReloading}
                      id={device.id}
                      reloading={reloading}
                      deviceId={device.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    </div>
  );
}

function ButtonActions({ id, setReloading, reloading, deviceId }) {
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Action
      </Button>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            deleteDevice(id).then(status => {
              if (status) {
                setReloading(!reloading);
              }
            });
          }}
        >
          <ListItemText primary="delete" />
        </MenuItem>
        <MenuItem component={Link} to={`/temp/device/${deviceId}`}>
          <ListItemText primary="Info" />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
