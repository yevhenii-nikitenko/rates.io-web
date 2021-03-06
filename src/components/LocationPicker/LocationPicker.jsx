import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setMapCenter, setCurrentCity } from '../../store/actions';
import GoogleMapsServicesContext from '../../context/googleMapsServices';

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

const useStyles = makeStyles((theme) => ({
    icon: {
        color: '#282c34',
        marginRight: theme.spacing(2),
    },
}));

const LocationPicker = () => {
    const { autocompleteService, placesService } = React.useContext(
        GoogleMapsServicesContext,
    );
    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(null);
    const currentCity = useSelector((state) => state.geo.currentCity);

    React.useEffect(() => {
        currentCity && setValue(currentCity.name);
    }, [currentCity]);

    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    const getPlacePredictions = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService?.getPlacePredictions(
                    {
                        ...request,
                        types: ['(cities)'],
                        componentRestrictions: {
                            country: 'ua',
                        },
                    },
                    callback,
                );
            }, 200),
        [autocompleteService],
    );

    React.useEffect(() => {
        if (inputValue === '') {
            setOptions(value ? [value] : []);

            return;
        }

        getPlacePredictions({ input: inputValue }, (results) => {
            let newOptions = [];

            if (value) {
                newOptions = [value];
            }

            if (results) {
                newOptions = [...newOptions, ...results];
            }

            setOptions(newOptions);
        });
    }, [value, inputValue, getPlacePredictions]);

    const onChange = (event, newValue) => {
        if (newValue?.place_id) {
            placesService?.getDetails(
                {
                    placeId: newValue.place_id,
                    fields: [
                        'name',
                        'formatted_address',
                        'place_id',
                        'geometry',
                    ],
                },
                (res, st) => {
                    dispatch(
                        setCurrentCity({
                            name: newValue.description,
                            place_id: res.place_id,
                        }),
                    );
                    dispatch(
                        setMapCenter({
                            lat: res.geometry.location.lat(),
                            lng: res.geometry.location.lng(),
                        }),
                    );
                },
            );
        }

        setOptions(newValue ? [newValue, ...options] : options);
        newValue && setValue(newValue);
    };

    return (
        <Autocomplete
            style={{
                width: '100%',
                background: 'white',
                padding: '6px',
                margin: '1px 6px',
                position: 'relative',
            }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            size="small"
            value={value}
            onChange={onChange}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <CssTextField
                    {...params}
                    label="??????????"
                    variant="outlined"
                    fullWidth
                />
            )}
            renderOption={(option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [
                        match.offset,
                        match.offset + match.length,
                    ]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
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
};

export default LocationPicker;
