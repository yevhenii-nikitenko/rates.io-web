import { SET_GOOGLE_MAPS_API, SET_MAP_CENTER, SET_CURRENT_CITY } from '../constants';

const initialState = {
    map: null, // google map object
    maps: null, // google maps object
    autocompleteService: null, //google maps Autocomplete Service instance
    placesService: null, // google maps Places Service instance
    mapCenter: null, // map center place { lat: '', lng: '' }
    currentCity: null, // current city { name: '', place_id: '' }
};

const mapReducer = (state = initialState, action) => {
    if (action.type === SET_GOOGLE_MAPS_API) {
        /** triggered once on google maps api loaded*/
        const { map, maps } = action.payload;

        return {
            ...state,
            maps,
            map,
            autocompleteService: new maps.places.AutocompleteService(),
            placesService: new maps.places.PlacesService(map),
        };
    }

    if (action.type === SET_MAP_CENTER) {
        /** set map center coordinates */
        return {
            ...state,
            mapCenter: action.payload,
        };
    }

    if (action.type === SET_CURRENT_CITY) {
        /** set current city data */
        return {
            ...state,
            currentCity: action.payload,
        };
    }

    return state;
};

export default mapReducer;
