import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
} from 'react-router-dom';
import './App.css';
import Map from '../Map/Map.jsx';
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import ExchangersList from '../ExchangersList/ExchangersList';
import GoogleMapsServicesContext from '../../context/googleMapsServices';
import { setExchanges } from '../../store/actions';

import exchangers from '../../db/exchangers';

const App = () => {
    const dispatch = useDispatch();
    const [autocompleteService, setAutocompleteService] = React.useState(null);
    const [placesService, setPlacesService] = React.useState(null);
    const currentCity = useSelector((state) => state.geo.currentCity);

    React.useEffect(() => {
        // simulating load exchangers from db by provided currentCity.place_id
        currentCity &&
            dispatch(
                setExchanges(
                    exchangers.filter(
                        (exchanger) =>
                            exchanger.placeId === currentCity.place_id,
                    ),
                ),
            );
    }, [currentCity]);

    return (
        <GoogleMapsServicesContext.Provider
            value={{
                autocompleteService,
                setAutocompleteService,
                placesService,
                setPlacesService,
            }}
        >
            <div className="app-root">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/app" />
                        </Route>
                        <Route path="/app">
                            <Grid container>
                                <Grid item xs={5}>
                                    <Header />
                                    <ExchangersList />
                                </Grid>
                                <Grid item xs={7}>
                                    <Map />
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/admin">
                            <div>Admin</div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </GoogleMapsServicesContext.Provider>
    );
};

export default App;
