import { combineReducers } from 'redux';
import exchangesReducer from './exchanges.reducer';
import geoReducer from './geo.reducer';
import searchReducer from './search.reducer';

const rootReducer = combineReducers({
    exchanges: exchangesReducer,
    geo: geoReducer,
    search: searchReducer
});

export default rootReducer;
