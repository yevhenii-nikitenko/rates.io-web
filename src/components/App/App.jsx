import React from 'react';
import './App.css';
import Map from '../Map/Map.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { useSelector } from 'react-redux';

const  App = () => {
  const selectedExchaner = useSelector(state => state.selectedExchaner);
  const markerIsOpened = useSelector(state => state.markerIsOpened);

  return (
    <div className="app-root">
    <Grid container>
      <Grid item xs={6}>
        <AppBar
          position="sticky"
          className="app-bar"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Map
            </Typography>
          </Toolbar>
        </AppBar>
        {
        selectedExchaner ?
        <Grid container>
          <Grid item xs={12}>{selectedExchaner.id}</Grid>
        </Grid>
        : 
        <Grid container>
          <Grid item xs={6}>b{markerIsOpened.toString()}</Grid>
          <Grid item xs={6}>a</Grid>
        </Grid>
        }
      </Grid>
      <Grid item xs={6}>
        <Map />
      </Grid>
    </Grid>
  </div>);
}

export default App;
