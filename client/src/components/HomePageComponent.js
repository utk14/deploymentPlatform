/*eslint react/jsx-filename-extension: 0 */

import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

import '../styles/homepage.css';

function HomePageComponent() {
  return (
    <div className="root" style={{backgroundColor: 'red'}}>
      <AppBar position="static" className="app">
        <Toolbar>
          <Link to={`/home`} className="lnk">
            <IconButton className="menuButton" color="inherit" aria-label="Menu">
              <Home />
            </IconButton>
          </Link>
          <Link to={`/listUrl`} className="lnk">
          <Typography variant="h6" color="inherit" className="grow">
             App 
          </Typography>
          </Link>
          <Link to={`/newApp`} className="lnk">
          <Typography variant="h6" color="inherit" className="grow">
             NewApp 
          </Typography>
          </Link>
          <span className="heading">
          Rx-Actor Model</span>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HomePageComponent;
