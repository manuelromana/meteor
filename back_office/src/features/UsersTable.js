import React, { useState } from "react";
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

function UsersTable() {
  const [users, setUsers] = useState({});

  async function loginPost(credentials) {
    const result = await axios.post("http://my-app.fr/user/login", credentials);
    setAuthenticate(result.data);
  }
  return (
    <div>
      {loading && "loading"}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
            </TableRow>
          </TableHead>
          {users && (
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Paper>
    </div>
  );
}

function ButtonActions({ id }) {
  const { t } = useTranslation();
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
        {t("Actions")}
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
        <MenuItem component={Link} to={`/user/${id}`}>
          <ListItemText primary={t("Configuration")} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UsersTable;
