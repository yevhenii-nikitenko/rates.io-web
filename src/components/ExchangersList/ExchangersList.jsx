import React from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import getDistanceBetweenPoints from '../../libs/getDistanceBetweenPoints';
import AvarageRate from '../AvarageRate/AvarageRate';
import { operations, ANY_CURRENCY } from '../../constants';

const ExchangersList = () => {
    const { selected, list } = useSelector((state) => state.exchanges);
    const { operation, currency, distance } = useSelector(
        (state) => state.search,
    );
    const mapCenter = useSelector((state) => state.geo.mapCenter);

    const center =
        mapCenter &&
        new window.google.maps.LatLng(mapCenter.lat, mapCenter.lng);

    const filteredList = list
        .filter((place) => {
            // filters by location
            if (!center) return;

            if (distance === -1) return place;

            const point = new window.google.maps.LatLng(place.lat, place.lng);

            if (getDistanceBetweenPoints(center, point) <= distance * 1000) {
                return place;
            }
        })
        .filter((exchange) => {
            if (!currency.code) return true;

            return exchange.rates[currency.code.toLowerCase()];
        });

    const avarage =
        currency !== ANY_CURRENCY &&
        filteredList.reduce((acc, exchange) => {
            const selectedCurrency =
                exchange.rates[currency.code.toLowerCase()];

            if (!selectedCurrency) return acc;

            acc +=
                operation === operations.BUY
                    ? selectedCurrency.ask
                    : selectedCurrency.bid;

            return acc;
        }, 0) / filteredList.length;

    const showAvarage =
        avarage &&
        !selected &&
        currency !== ANY_CURRENCY &&
        filteredList.length > 1;

    return (
        <div
            className="app-exchanges-main"
            style={{
                overflowY: 'scroll',
                height: 'calc(100vh - 123px)',
            }}
        >
            {showAvarage ? (
                <AvarageRate
                    operation={operation}
                    currency={currency}
                    avarage={avarage.toFixed(2)}
                />
            ) : null}
            {selected ? (
                <Grid container>
                    <Grid item xs={12}>
                        <PlaceDetails exchanger={selected} expanded={true} />
                    </Grid>
                </Grid>
            ) : (
                filteredList.map((exchange) => {
                    return (
                        <PlaceDetails
                            key={exchange.id}
                            exchanger={exchange}
                            operation={operation}
                            currency={currency}
                        />
                    );
                })
            )}
        </div>
    );
};

export default ExchangersList;
