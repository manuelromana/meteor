import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Home from '@material-ui/icons/Home';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/icons/List';
import { Redirect } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    flexGrow: 1,
    color: 'white',
    textDecorationLine: 'none',
    textDecorationThickness: '1px',
  },
}));

const logout = () => {
  localStorage.removeItem('token');
  return undefined;
};

export default function ButtonAppBar() {
  const classes = useStyles();
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.button}>
            Projet MeteOr
          </Link>

          <Link to="/devices" className={classes.button}>
            <List></List>
            Devices
          </Link>
          <Link to="/add/device" className={classes.button}>
            <Add></Add>
            device
          </Link>

          <Button color="inherit" onClick={() => setToken(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
