const LOCALITY = 'locality';

const getCity = (maps, callback) => {
    if (navigator.geolocation) {
        var geocoder = new maps.Geocoder();
        navigator.geolocation.getCurrentPosition((position) => {
            var geolocate = new maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            geocoder.geocode({
                latLng: geolocate
            }, (results, status) => {
                if (status === maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var city = null;
                        var c, lc, component;
                        for (var r = 0, rl = results.length; r < rl; r += 1) {
                            var result = results[r];

                            if (!city && result.types[0] === LOCALITY) {
                                for (
                                    c = 0, lc = result.address_components.length; c < lc; c += 1
                                ) {
                                    component = result.address_components[c];

                                    if (component.types[0] === LOCALITY) {
                                        city = component.long_name;
                                        break;
                                    }
                                }
                            }
                        }

                        callback(city);
                    }
                }
            });
        });
    }
};

export default getCity;