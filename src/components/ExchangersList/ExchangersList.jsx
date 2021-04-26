import React from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import getDistanceBetweenPoints from '../../libs/getDistanceBetweenPoints';

const ExchangersList = () => {
    const { selected, list } = useSelector((state) => state.exchanges);
    const {
        operation,
        currency, 
        distance, 
    } = useSelector((state) => state.search);
    const mapCenter = useSelector((state) => state.geo.mapCenter);

    const center = mapCenter && new window.google.maps.LatLng(mapCenter.lat, mapCenter.lng);

    return (
        <div className="app-exchanges-main" style={{
            overflowY: 'scroll',
            height: 'calc(100vh - 123px)'
        }}>
            {selected ? 
                <Grid container>
                    <Grid item xs={12}>
                        <PlaceDetails
                            exchanger={selected}
                        />
                    </Grid>
                </Grid> 
                : 
                list.filter(place => {
                    if (!center) return;

                    if (distance === -1) return place;

                    const point = new window.google.maps.LatLng(place.lat, place.lng);

                    if (getDistanceBetweenPoints(center, point) <= distance * 1000) {
                        return place;
                    }

                }).map((exchange) => {
                    return (
                        <PlaceDetails
                            key={exchange.id}
                            exchanger={exchange}
                        />
                    );
                })}
        </div>
    ); 
}

export default ExchangersList;
