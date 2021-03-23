import { SELECT_EXCHANGE, DESELECT_EXCHANGE, MARKER_IS_OPENED } from '../constants';

export const selectExchange = payload => {
    return { type: SELECT_EXCHANGE, payload };
};

export const deselectExchange = () => {
    return { type: DESELECT_EXCHANGE };
};

export const toggleMarkerIsSelected = payload => {
    return { type: MARKER_IS_OPENED, payload };
};