import React from 'react';
import './App.css';
import Map from '../Map/Map.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { RiExchangeDollarLine } from 'react-icons/ri';
import LocationPicker from '../LocationPicker/LocationPicker';
import { useSelector, useDispatch } from 'react-redux';
import { setGoogleMapsApi } from '../../store/actions';

const getCity = (maps, callback) => {
  if(navigator.geolocation) {
    // var geocoder = new window.google.maps.Geocoder();
    var geocoder = new maps.Geocoder();
    navigator.geolocation.getCurrentPosition(position => {
      // var geolocate = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var geolocate = new maps.LatLng(position.coords.latitude, position.coords.longitude);
    
      geocoder.geocode({'latLng': geolocate}, (results, status) => {
        // if (status === window.google.maps.GeocoderStatus.OK) {
        if (status === maps.GeocoderStatus.OK) {
          if (results[1]) {
              var city = null;
              var c, lc, component;
              for (var r = 0, rl = results.length; r < rl; r += 1) {
                  var result = results[r];
  
                  if (!city && result.types[0] === 'locality') {
                      for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                          component = result.address_components[c];
  
                          if (component.types[0] === 'locality') {
                              city = component.long_name;
                              break;
                          }
                      }
                  }
              }
  
              callback(city);
          }
      }
      });
    })
  }
}

const App = () => {
  const exchanger = useSelector(state => state.exchanger);
  const dispatch = useDispatch();

  const [city, setCity] = React.useState(null);

  const [coords, setCoords] = React.useState({
    lat: 50.463528,
    lng: 30.5053546
});

  const handleApiLoaded = (map, maps) => {
    console.log('a', map);
    console.log('as', maps);
    getCity(maps, setCity);
    dispatch(setGoogleMapsApi({map, maps}));
  };

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
              <RiExchangeDollarLine size="1.2em"  color="white" />
            </IconButton>
            <LocationPicker city={city} setCoords={setCoords} />
          </Toolbar>
        </AppBar>
        {
        exchanger.selected ?
        <Grid container>
          <Grid item xs={12}>{exchanger.selected.id}</Grid>
        </Grid>
        : 
        <Grid container>
          <Grid item xs={6}>b{exchanger.markerIsOpened.toString()}</Grid>
          <Grid item xs={6}>a</Grid>
        </Grid>
        }
      </Grid>
      <Grid item xs={6}>
        <Map handleApiLoaded={handleApiLoaded} center={coords} />
      </Grid>
    </Grid>
  </div>);
}

export default App;
