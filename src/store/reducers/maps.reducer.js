import { SET_GOOGLE_MAPS_API, SET_CENTER, SET_CITY } from '../constants';

const initialState = {
    map: null,
    maps: null,
    autocompleteService: null,
    placesService: null,
    center: null,
    city: null,
};

const mapReducer = (state = initialState, action) => {
    if (action.type === SET_GOOGLE_MAPS_API) {
        const maps = action.payload.maps;
        const map = action.payload.map;

        return {
            ...state,
            maps,
            map,
            autocompleteService: new maps.places.AutocompleteService(),
            placesService: new maps.places.PlacesService(map),
        };
    }

    if (action.type === SET_CENTER) {
        return {
            ...state,
            center: action.payload,
        };
    }

    if (action.type === SET_CITY) {
        return {
            ...state,
            city: action.payload,
        };
    }

    return state;
};

export default mapReducer;
