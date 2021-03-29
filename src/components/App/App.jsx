import React from "react";
import "./App.css";
import Map from "../Map/Map.jsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { RiExchangeDollarLine } from "react-icons/ri";
import LocationPicker from "../LocationPicker/LocationPicker";
import { useSelector } from "react-redux";
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const App = () => {
  const exchanger = useSelector((state) => state.exchanger);

  return (
    <div className="app-root">
      <Grid container>
        <Grid item xs={6}>
          <AppBar position="sticky" className="app-bar">
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer" edge="start">
                <RiExchangeDollarLine size="1.2em" color="white" />
              </IconButton>
              <LocationPicker />
            </Toolbar>
          </AppBar>
          {exchanger ? (
            <Grid container>
              <Grid item xs={12}>
                {/* {exchanger.selected.id} */}
                <PlaceDetails exchanger={exchanger} />
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={6}>
                bbb
                {/* b{exchanger.markerIsOpened.toString()} */}
              </Grid>
              <Grid item xs={6}>
                a
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
