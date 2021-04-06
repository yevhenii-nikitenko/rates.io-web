import { combineReducers } from 'redux';
import exchangerReducer from './exchanger.reducer';
import mapReducer from './maps.reducer';

const rootReducer = combineReducers({
    exchanger: exchangerReducer,
    googleMaps: mapReducer,
});

export default rootReducer;
