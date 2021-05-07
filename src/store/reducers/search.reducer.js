import { SET_SEARCH_PARAMS, CLEAR_SEARCH_PARAMS } from '../constants';
import { operations, ANY_CURRENCY } from '../../constants';

const initialState = {
    operation: operations.SELL,
    currency: ANY_CURRENCY,
    distance: -1,
};

const searchReducer = (state = initialState, action) => {
    if (action.type === SET_SEARCH_PARAMS) {
        return {
            ...action.payload,
        };
    }

    if (action.type === CLEAR_SEARCH_PARAMS) {
        return initialState;
    }

    return state;
};

export default searchReducer;
