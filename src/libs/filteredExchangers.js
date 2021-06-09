import getDistanceBetweenPoints from './getDistanceBetweenPoints';

const filteredExchangers = ({ list, center, distance, currency, openNow }) => {
    return list
        .filter((exchanger) => {
            // filters by location
            if (!center) return;

            if (distance === -1) return exchanger;

            const point = new window.google.maps.LatLng(
                exchanger.lat,
                exchanger.lng,
            );

            if (getDistanceBetweenPoints(center, point) <= distance * 1000) {
                return exchanger;
            }
        })
        .filter((exchanger) => {
            const { fullDay, start, end } = exchanger.workingHours;

            if (!openNow) return true;

            if (openNow) {
                const now = new Date().toLocaleTimeString('en-US', {
                    hour12: false,
                });

                if (fullDay || (start < now && now < end)) return true;
            }
        })
        .filter((exchanger) => {
            if (!currency.code) return true;

            return exchanger.rates[currency.code];
        });
};

export default filteredExchangers;
