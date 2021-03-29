import {
    SET_GOOGLE_MAPS_API
 } from '../constants';

const initialState = {
    map: null,
    maps: null,
    autocompleteService: null,
    placesService: null
};

const mapReducer = (state = initialState, action) => {
    if (action.type === SET_GOOGLE_MAPS_API) {
        const maps = action.payload.maps ;
        const map = action.payload.map;

        return { 
            ...state, 
            maps,
            map,
            autocompleteService: new maps.places.AutocompleteService(), 
            placesService: new maps.places.PlacesService(map)
         };
    }

    return state;
};

export default mapReducer;