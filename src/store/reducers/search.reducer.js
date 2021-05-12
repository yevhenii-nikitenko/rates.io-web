import { SET_SEARCH_PARAMS, CLEAR_SEARCH_PARAMS } from '../constants';
import { operations, ANY_CURRENCY, sortBy } from '../../constants';

const initialState = {
    operation: operations.SELL,
    currency: ANY_CURRENCY,
    sortBy: sortBy.NO_SORT,
    distance: -1,
    openNow: false
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
