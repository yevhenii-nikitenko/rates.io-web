import { sortBy as SORT_BY, operations } from '../constants';
import getDistanceBetweenPoints from './getDistanceBetweenPoints';

const sort = ({ sortBy, operation, code, center }) => (prev, next) => {
    if (sortBy === SORT_BY.PRICE_ASC) {
        if (operation === operations.BUY) {
            if (
                prev.rates[code].ask / prev.rates[code].count <
                next.rates[code].ask / next.rates[code].count
            ) {
                return -1;
            }
        }

        if (operation === operations.SELL) {
            if (
                prev.rates[code].bid / prev.rates[code].count <
                next.rates[code].bid / next.rates[code].count
            ) {
                return -1;
            }
        }
    }

    if (sortBy === SORT_BY.PRICE_DESC) {
        if (operation === operations.BUY) {
            if (
                prev.rates[code].ask / prev.rates[code].count >
                next.rates[code].ask / next.rates[code].count
            ) {
                return -1;
            }
        }

        if (operation === operations.SELL) {
            if (
                prev.rates[code].bid / prev.rates[code].count >
                next.rates[code].bid / next.rates[code].count
            ) {
                return -1;
            }
        }
    }

    if (sortBy === SORT_BY.DISTANCE_DESC) {
        const prevPoint = new window.google.maps.LatLng(prev.lat, prev.lng);
        const nextPoint = new window.google.maps.LatLng(next.lat, next.lng);

        if (
            getDistanceBetweenPoints(center, prevPoint) >
            getDistanceBetweenPoints(center, nextPoint)
        ) {
            return -1;
        }
    }

    if (sortBy === SORT_BY.DISTANCE_ASC) {
        const prevPoint = new window.google.maps.LatLng(prev.lat, prev.lng);
        const nextPoint = new window.google.maps.LatLng(next.lat, next.lng);

        if (
            getDistanceBetweenPoints(center, prevPoint) <
            getDistanceBetweenPoints(center, nextPoint)
        ) {
            return -1;
        }
    }
};

export default sort;
