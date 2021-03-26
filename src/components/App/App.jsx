import React from 'react';
import './App.css';
import Map from '../Map/Map.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { RiExchangeDollarLine } from 'react-icons/ri';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#282c34;',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#282c34;',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#282c34;',
      },
      '&:hover fieldset': {
        borderColor: '#282c34;',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#282c34;',
      },
    },
  },
})(TextField);

const autocompleteService = { current: null };
const placesService = { current: null };
const map = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'white',
    marginRight: theme.spacing(2),
  },
}));

const getCity = (maps, callback) => {
  if(navigator.geolocation) {
    // var geocoder = new window.google.maps.Geocoder();
    var geocoder = new maps.Geocoder();
    navigator.geolocation.getCurrentPosition(position => {
      // var geolocate = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var geolocate = new maps.LatLng(position.coords.latitude, position.coords.longitude);
    
      geocoder.geocode({'latLng': geolocate}, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
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

const CityPicker = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    setValue(props.city);
  }, [props.city])

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions({
          ...request,
          types: ['(cities)'],
          componentRestrictions: {
            country: 'ua'
          }
        }, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (!placesService.current && window.google) {
      placesService.current = new window.google.maps.places.PlacesService(map.current);
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      // set default place here
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      style={{
        width: 300,
        background: 'white',
        padding: '7px',
        margin: '7px',
        position: 'absolute',
        right: '0px'
      }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      size="small"
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.place_id) {
          placesService.current.getDetails({
            placeId: newValue.place_id,
            fields: ["name", "formatted_address", "place_id", "geometry"],
          }, (res, st) => {
            props.setCoords({ lat: res.geometry.location.lat(), lng: res.geometry.location.lng() });
          })
        }
        
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        // <TextField {...params} label="Add a location" variant="outlined" fullWidth />
        <CssTextField {...params} label="Add a location" variant="outlined" fullWidth />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

const App = () => {
  const selectedExchaner = useSelector(state => state.selectedExchaner);
  const markerIsOpened = useSelector(state => state.markerIsOpened);

  const [city, setCity] = React.useState(null);
  const [coords, setCoords] = React.useState({
    lat: 50.463528,
    lng: 30.5053546
});

  const handleApiLoaded = (_map, _maps) => {
    map.current = _map;
    getCity(_maps, setCity);
  };

  console.log('coords change', coords);
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
            <CityPicker city={city} setCoords={setCoords} />
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
        <Map handleApiLoaded={handleApiLoaded} center={coords} />
      </Grid>
    </Grid>
  </div>);
}

export default App;
