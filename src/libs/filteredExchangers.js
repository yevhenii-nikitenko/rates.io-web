import getDistanceBetweenPoints from './getDistanceBetweenPoints';

const filteredExchangers = ({ list, center, distance, currency }) => {
    return (
        list
            .filter((exchanger) => {
                // filters by location
                if (!center) return;

                if (distance === -1) return exchanger;

                const point = new window.google.maps.LatLng(
                    exchanger.lat,
                    exchanger.lng,
                );

                if (
                    getDistanceBetweenPoints(center, point) <=
                    distance * 1000
                ) {
                    return exchanger;
                }
            })
            // TODO
            // add openNow filter
            .filter((exchanger) => {
                if (!currency.code) return true;

                return exchanger.rates[currency.code];
            })
    );
};

export default filteredExchangers;
