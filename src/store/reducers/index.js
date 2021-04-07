import { combineReducers } from 'redux';
import exchangesReducer from './exchanges.reducer';
import geoReducer from './geo.reducer';

const rootReducer = combineReducers({
    exchanges: exchangesReducer,
    geo: geoReducer
});

export default rootReducer;
