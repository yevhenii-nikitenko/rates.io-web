import React from 'react';
import './App.css';
import Map from '../Map/Map.jsx';
import Grid from '@material-ui/core/Grid';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import GoogleMapsServicesContext from '../../context/googleMapsServices';
import { setExchanges } from '../../store/actions';

import places from '../../db/places';

const App = () => {
    const dispatch = useDispatch();
    const [autocompleteService, setAutocompleteService] = React.useState(null);
    const [placesService, setPlacesService] = React.useState(null);
    const selectedExchanger = useSelector((state) => state.exchanges.selected);
    const exchanges = useSelector((state) => state.exchanges.list);
    const currentCity = useSelector((state) => state.geo.currentCity);

    React.useEffect(() => {
        currentCity &&
            dispatch(
                setExchanges(
                    places.filter(
                        (place) => place.placeId === currentCity.place_id,
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
                <Grid container>
                    <Grid item xs={6} className="app-exchanges-main" style={{
                        overflowY: 'scroll',
                        height: '100vh'
                    }}>
                        <Header />
                        {exchanges.map((exchange) => {
                            return (
                                <PlaceDetails
                                    key={exchange.id}
                                    exchanger={exchange}
                                />
                            );
                        })}
                        {selectedExchanger ? (
                            <Grid container>
                                <Grid item xs={12}>
                                    <PlaceDetails
                                        exchanger={selectedExchanger}
                                    />
                                </Grid>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid item xs={6}>
                        <Map places={exchanges} />
                    </Grid>
                </Grid>
            </div>
        </GoogleMapsServicesContext.Provider>
    );
};

export default App;
