import {
    SELECT_EXCHANGE,
    DESELECT_EXCHANGE,
    MARKER_IS_OPENED,
    SET_GOOGLE_MAPS_API,
    SET_CENTER,
    SET_CITY,
} from '../constants';

export const selectExchange = (payload) => {
    return {
        type: SELECT_EXCHANGE,
        payload,
    };
};

export const deselectExchange = () => {
    return {
        type: DESELECT_EXCHANGE,
    };
};

export const toggleMarkerIsSelected = (payload) => {
    return {
        type: MARKER_IS_OPENED,
        payload,
    };
};

export const setGoogleMapsApi = (payload) => {
    return {
        type: SET_GOOGLE_MAPS_API,
        payload,
    };
};

export const setCenter = (payload) => {
    return {
        type: SET_CENTER,
        payload,
    };
};

export const setCity = (payload) => {
    return {
        type: SET_CITY,
        payload,
    };
};
