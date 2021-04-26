import { SET_MAP_CENTER, SET_CURRENT_CITY } from '../constants';

const initialState = {
    mapCenter: null, // map center place { lat: '', lng: '' }
    currentCity: null, // current city { name: '', place_id: '' }
};

const geoReducer = (state = initialState, action) => {
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

export default geoReducer;
